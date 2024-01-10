const router = require('express').Router();

const { auth } = require('../../../middleware');
const { Food } = require('../../../models');
const { ResourceNotFoundError } = require('../../../errors');

router.get('/named', auth, async (req, res, next) => {
    const term = req.query.term;

    let result;
    try {
        result = await Food.find({ name: RegExp(`${term}`, 'i') });
    } catch (error) {
        next(error);
    }

    console.log(result[1])

    return res.status(200).json(result);
});

router.post('/advanced', auth, async (req, res, next) => {
    const searchOptions = req.body;
    const nameTerm = req.query.name;
    const query = { name: nameTerm && RegExp(`${nameTerm}`, 'i') };

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