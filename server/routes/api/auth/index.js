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
            goals: user.goals
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
            password
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
        const { username, email, _id: id } = await User.findById(userId);

        res.status(200).json({
            username,
            email,
            id
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;