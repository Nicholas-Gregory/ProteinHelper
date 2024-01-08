const router = require('express').Router();

router.get('/test', (req, res, next) => {
    setTimeout(() => {
        try {
            throw new Error('err');
        } catch (err) {
            next(err)
        }
    }, 100)
})

module.exports = router;