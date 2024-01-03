const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    histidine: {
        type: Number,
        default: 0
    },
    isoleucine: {
        type: Number,
        default: 0
    },
    leucine: {
        type: Number,
        default: 0
    },
    lysine: {
        type: Number,
        default: 0
    },
    methionine: {
        type: Number,
        default: 0
    },
    phenylalanine: {
        type: Number,
        default: 0
    },
    threonine: {
        type: Number,
        default: 0
    },
    tryptophan: {
        type: Number,
        default: 0
    },
    valine: {
        type: Number,
        default: 0
    }
});

const Food = model('Food', foodSchema);

module.exports = Food;