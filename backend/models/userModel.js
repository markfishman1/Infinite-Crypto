const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLenght: [7, 'A password must have atleast 7 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    balance: {
        type: Number,
        required: true,
        min: 10000,
        max: 1000000,
    },
    favCoins: {
        type: Array,
    },
    passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
    // if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (userPassword, providedPassword) {
    return await bcrypt.compare(providedPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
