const { Creation } = require('../../../models');
const { auth } = require('../../../middleware');

const router = require('express').Router();

router.get('/keyword', auth, async (req, res, next) => {
    const queryArray = req.query.keywords
    .split(',')
    .map(keyword => ({ name: RegExp(keyword, 'i') }));

    try {
        const results = await Creation.find({
            $or: queryArray
        });

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