const { Schema, model } = require('mongoose');

const foodEntrySchema = new Schema({
    food: {
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
}, { timestamps: true });

const Creation = model('Creation', creationSchema);

module.exports = Creation;