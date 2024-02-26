const router = require('express').Router();
const { Types: { ObjectId } } = require('mongoose');

const { Creation, User } = require('../../../models');
const { ResourceNotFoundError, AuthenticationError } = require('../../../errors');
const { auth } = require('../../../middleware');

router.post('/', auth, async (req, res, next) => {
    const data = req.body;

    try {
        const { _id } = await Creation.create(data);
        
        await User.findByIdAndUpdate(data.user, {
            $push: {
                creations: _id
            }
        }, { runValidators: true });

        return res.status(201).json({ message: 'Save successful!' });
    } catch (error) {
        next(error);
    }
}); 

router.put('/:creationId', auth, async (req, res, next) => {
    const data = req.body;
    const creationId = req.params.creationId;

    try {
        const creation = await Creation.findById(creationId);

        if (!creation) {
            throw new ResourceNotFoundError(`No Creation with id ${creationId} exists.`);
        }

        if (!new ObjectId(req.userId).equals(creation.user)) {
            throw new AuthenticationError('Must be logged in as owner of Creation to edit it.');
        }

        Object.assign(creation, data);

        await creation.save();

        return res.status(200).json(creation);
    } catch (error) {
        next(error);
    }
});

router.get('/', auth, async (req, res, next) => {
    let query;
    let filter;

    if (req.query.following) {
        const { following } = await User.findById(req.userId);

        filter = {
            user: { $in: following }
        }
    }

    try {
        query = Creation
        .find(filter)
        .populate('foods')
        .populate('user');

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

router.get('/:id', auth, async (req, res, next) => {
    const id = req.params.id;

    let creation
    try {
        creation = await Creation.findById(id);

        for (let i = 0; i < creation.foods.length; i++) {
            await creation.populate(`foods.${i}.food`);
        }
    } catch (error) {
        next(error);
    }

    res.status(200).json(creation);
});

router.use('/search', require('./search.js'));

module.exports = router;