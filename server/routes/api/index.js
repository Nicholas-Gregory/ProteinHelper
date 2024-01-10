const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/food', require('./food'));
router.use('/creation', require('./creation'));

module.exports = router;