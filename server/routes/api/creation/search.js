const { Creation, Food } = require('../../../models');
const { auth } = require('../../../middleware');
const { BadRequestError } = require('../../../errors');

const router = require('express').Router();

router.get('/keyword', auth, async (req, res, next) => {
    const queryArray = req.query.keywords
    .split(',')
    .map(keyword => ({ name: RegExp(keyword, 'i') }));

    const food = req.query.food === 'true' ? true : false;
    const name = req.query.name === 'true' ? true : false;

    try {
        if (!food && !name) {
            throw new BadRequestError('Must keyword search by either name or food or both');
        }

        let byFoodResults;
        let byCreationResults;
        let results;

        if (food) {
            const foodResults = await Food.find({
                $or: queryArray
            });

            byFoodResults = await Creation.find({
                'foods.food': {
                    $in: foodResults.map(result => result._id)
                }
            });
        }

        if (name) {
            byCreationResults = await Creation.find({
                $or: queryArray
            });
        }

        if (food && name) {
            results = [...byFoodResults, ...byCreationResults]
        } else {
            results = food ? byFoodResults : byCreationResults;
        }

        results = results.filter((value, index) => results.findIndex(result => result._id.equals(value._id)) === index);

        for (let result of results) {
            await result.populate('user');

            for (let i = 0; i < result.foods.length; i++) {
                await result.populate(`foods.${i}.food`);
            }
        }

        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

module.exports = router;