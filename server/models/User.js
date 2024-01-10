const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
    creations: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Creation'
        }]
    }
});

userSchema.methods.compareHashedPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;