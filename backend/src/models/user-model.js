const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const hashed_password = await bcrypt.hash(this.password, 10);
    this.password = hashed_password;
    next();
});

UserSchema.methods.comparePassword = function(given_password) {
    return bcrypt.compare(given_password, this.password);
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
