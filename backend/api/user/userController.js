const mongoose = require('mongoose');
const User = require('./../../models/userModel');
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne(req.params);
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    } catch {}
};
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find(req.params);
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
