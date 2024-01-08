const router = require('express').Router();

const { auth } = require('../../middleware');

router.get('/test', auth, (req, res, next) => {
    res.json('authen')
})

module.exports = router;