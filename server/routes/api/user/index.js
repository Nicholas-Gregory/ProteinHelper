const router = require('express').Router();

const { User } = require('../../../models');
const { ResourceNotFoundError, AuthenticationError } = require('../../../errors');
const { auth } = require('../../../middleware');

router.get('/:id', auth, async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User
        .findById(userId)
        .populate({ 
            path: 'creations',
            populate: 'user'
        });

        for (let creation of user.creations) {
            for (let i = 0; i < creation.foods.length; i++) {
                await creation.populate(`foods.${i}.food`);
            }
        }

        if (!user) {
            throw new ResourceNotFoundError(`No user exists with ID ${userId}`);
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        if (req.userId !== userId) {
            throw new AuthenticationError('Must be logged in as user to edit profile');
        }

        const user = await User.findByIdAndUpdate(userId, data, { 
            runValidators: true,
            new: true 
        });

        res.status(200).json({ bio: user.bio });
    } catch (error) {
        next(error);
    }
});

module.exports = router;