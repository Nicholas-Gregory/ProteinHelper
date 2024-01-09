const router = require('express').Router();

const authRoutes = require('./auth');
const foodRoutes = require('./food');

router.use('/auth', authRoutes);
router.use('/food', foodRoutes);

module.exports = router;