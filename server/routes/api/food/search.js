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

    res.status(200).json(result);
});

module.exports = router;