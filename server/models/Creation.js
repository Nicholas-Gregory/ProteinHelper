const { Schema, model } = require('mongoose');

const foodEntrySchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    unit: {
        type: String,
        default: 'g'
    },
    amount: {
        type: Number,
        default: 100
    }
})

const creationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    foods: {
        type: [foodEntrySchema]
    }
});

const Creation = model('Creation', creationSchema);

module.exports = Creation;