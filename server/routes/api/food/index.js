const router = require('express').Router();

const { auth } = require('../../../middleware');
const { Food } = require('../../../models');
const { ResourceNotFoundError } = require('../../../errors');

router.get('/:id', auth, async (req, res, next) => {
    const foodId = req.params.id;

    let food;
    try {
        food = await Food.findById(foodId);

        if (!food) {
            throw new ResourceNotFoundError(`Food with id ${foodId} not found.`);
        }

    } catch (error) {
        next(error);
    }

    res.status(200).json(food);
});

module.exports = router;