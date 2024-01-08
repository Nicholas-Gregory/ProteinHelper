const jwt = require('jsonwebtoken');

const router = require('express').Router();

const { User } = require('../../models');
const AuthenticationError = require('../../errors/AuthenticationError');

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

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
}

router.post('/create', async (req, res, next) => {
    const { username, email, password } = req.body;

    let token;
    try {
        await User.create({
            username,
            email,
            password
        });

        token = await login(username, email, password);
    } catch (error) {
        return next(error);
    }

    res.status(201).json(token);
});

router.get('/login', async (req, res, next) => {
    const { username, email, password } = req.body;

    let token;
    try {
        token = await login(username, email, password);
    } catch (err) {
        return next(err);
    }

    return res.status(200).json(token);
})

module.exports = router;