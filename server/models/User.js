const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const goalsSchema = new Schema({
    histidine: {
        type: Number,
        default: 1.022
    },
    isoleucine: {
        type: Number,
        default: 1.387
    },
    leucine: {
        type: Number,
        default: 3.066
    },
    lysine: {
        type: Number,
        default: 2.774
    },
    methionine: {
        type: Number,
        default: 1.387
    },
    phenylalanine: {
        type: Number,
        default: 2.409
    },
    threonine: {
        type: Number,
        default: 1.46
    },
    tryptophan: {
        type: Number,
        default: 0.365
    },
    valine: {
        type: Number,
        default: 1.752
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: /^[\w-.!#$&'*+=?^`{}|~/]+@([\w-]+\.)+[\w-]{2,}$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        set: v => bcrypt.hashSync(v, 10)
    },
    bio: {
        type: String
    },
    creations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Creation'
        }]
    },
    goals: {
        type: goalsSchema, 
        default: () => ({})
    }
});

userSchema.methods.compareHashedPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;