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
        });

        return res.status(201).json({ message: 'Save successful!' });
    } catch (error) {
        next(error);
    }
}); 

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    let creation
    try {
        creation = Creation.findById(id);

        return res.status(200).json(creation);
    } catch (error) {
        next(error);
    }
});

module.exports = router;