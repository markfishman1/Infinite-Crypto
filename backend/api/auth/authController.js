const jwt = require('jsonwebtoken');
const User = require('./../../models/userModel');
const AppError = require('./../../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = async (req, res, next) => {
    try {
        console.log('body', req.body);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            balance: req.body.balance,
        });
        console.log(User, 'User');
        const token = signToken(newUser._id);
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        next(new AppError('Couldnt sign up', 404, err));
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError('Please provide email and passowrd', 400));
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.correctPassword(user.password, password)) {
            return next(new AppError('Incorrect email or passowrd', 401));
        }
        const token = signToken(user._id);
        console.log('token:', token);
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        console.log('err', err);
    }
};
exports.logout = async (req, res, next) => {
    try {
    } catch {}
};
