const { Schema, model } = require('mongoose');

const nutrientSchema = new Schema({
    name: String,
    unit: String,
    amount: Number
});

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nutrients: [nutrientSchema]
});

const Food = model('Food', foodSchema);

module.exports = Food;