const jwt = require('jsonwebtoken');

const router = require('express').Router();

const { User } = require('../../../models');
const { auth } = require('../../../middleware');
const AuthenticationError = require('../../../errors/AuthenticationError');

const login = async (username, email, password) => {
    let user = await User.findOne({ email });

    if (!user) {
        user = await User.findOne({ username });
    }

    if (!user) {
        throw new AuthenticationError('Incorrect email or password');
    }

    if (!user.compareHashedPassword(password)) {
        throw new AuthenticationError('Incorrect password');
    }

    return {
        token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }),
        user: {
            username: user.username,
            email: user.email,
            id: user._id,
            goals: user.goals,
            following: user.following,
            creations: user.creations
        }
    };
}

router.post('/create', async (req, res, next) => {
    const { username, email, password } = req.body;

    let result;
    try {
        await User.create({
            username,
            email,
            password,
            goals: [
                {
                    name: 'Histidine',
                    amount: 1.022
                },
                {
                    name: 'Isoleucine',
                    amount: 1.387
                },
                {
                    name: 'Leucine',
                    amount: 3.066
                },
                {
                    name: 'Lysine',
                    amount: 2.774
                },
                {
                    name: 'Methionine',
                    amount: 1.387
                },
                {
                    name: 'Phenylalanine',
                    amount: 2.409
                },
                {
                    name: 'Threonine',
                    amount: 1.46
                },
                {
                    name: 'Tryptophan',
                    amount: 0.365
                },
                {
                    name: 'Valine',
                    amount: 1.752
                }
            ]
        });

        result = await login(username, email, password);
    } catch (error) {
        return next(error);
    }

    res.status(201).json(result);
});

router.post('/login', async (req, res, next) => {
    const { username, email, password } = req.body;

    let result;
    try {
        result = await login(username, email, password);
    } catch (err) {
        return next(err);
    }

    return res.status(200).json(result);
});

router.get('/authorize', auth, async (req, res, next) => {
    const userId = req.userId;

    try {
        const { 
            username, 
            email, 
            _id: id,
            following,
            goals,
            creations
         } = await User.findById(userId);

        res.status(200).json({
            username,
            email,
            id,
            following,
            goals,
            creations
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;