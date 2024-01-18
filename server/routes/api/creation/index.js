const router = require('express').Router();

const { Creation, User } = require('../../../models');

router.post('/', async (req, res, next) => {
    const data = req.body;

    try {
        const { _id } = await Creation.create(data);
        
        await User.findByIdAndUpdate(data.userId, {
            $push: {
                creations: _id
            }
        }, { runValidators: true });

        return res.status(201).json({ message: 'Save successful!' });
    } catch (error) {
        next(error);
    }
}); 

router.get('/', async (req, res, next) => {
    let query;
    try {
        query = Creation
        .find()
        .populate('foods');

        if (req.query.sort) {
            query = query.sort({ createdAt: -1 });
        }

        const results = await query.exec();

        for (let creation of results) {
            for (let i = 0; i < creation.foods.length; i++) {
                await creation.populate(`foods.${i}.food`);
            }
        }

        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    let creation
    try {
        creation = await Creation.findById(id);
    } catch (error) {
        next(error);
    }

    res.status(200).json(creation);
});

module.exports = router;