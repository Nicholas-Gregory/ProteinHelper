const { Schema, model } = require('mongoose');

const combinationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    foods: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Food'
        }]
    }
});

const Combination = model('Combination', combinationSchema);

module.exports = Combination;