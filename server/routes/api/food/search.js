const router = require('express').Router();

const { auth } = require('../../../middleware');
const { Food } = require('../../../models');
const { ResourceNotFoundError } = require('../../../errors');

router.get('/named', auth, async (req, res, next) => {
    const terms = req.query.terms
    .split(',')
    .map(keyword => ({ name: RegExp(keyword, 'i')}));

    let result;
    try {
        result = await Food.find({ $or: terms });
    } catch (error) {
        next(error);
    }

    return res.status(200).json(result);
});

router.post('/advanced', auth, async (req, res, next) => {
    const searchOptions = req.body;
    const nameTerm = req.query.name;
    const query = {};

    if (nameTerm) {
        query.name = RegExp(nameTerm, 'i');
    }

    for (let key in searchOptions) {
        const option = searchOptions[key];

        if (option.modifier !== 'n') {
            switch (option.modifier) {
                case 'gte':
                    query[key] = { $gte: option.value };
                    break;
                case 'e':
                    query[key] = option.value;
                    break;
                case 'lte':
                    query[key] = { $lte: option.value };
                    break;
            }
        }
    }

    let result;
    try {
        result = await Food.find(query);
    } catch (error) {
        next(error);
    }

    return res.status(200).json(result);
});

module.exports = router;