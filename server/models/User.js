const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const goalsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

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
        minLength: 8,
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
        type: [goalsSchema]
    },
    following: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
});

userSchema.methods.compareHashedPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;