const mongoose = require('mongoose');
const User = require('./../../models/userModel');
const userService = require('./userService');

exports.getUserData = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const user = await userService.getUserById(req.params.id);
        console.log(user);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch (err) {
        console.log(err);
    }
};
exports.getUsersData = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        console.log(users[0].walletCoins, 'from controller');
        res.status(200).json({
            status: 'success',
            data: { users },
        });
    } catch {}
};
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.deleteOneById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch {}
};
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne(req.params);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch {}
};

exports.calculateUserBalance = async (req, res, next) => {
    try {
        console.log('hello aggregating');
        const balance = await User.aggregate([
            {
                $group: {
                    _id: '$coinType',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                balance,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
