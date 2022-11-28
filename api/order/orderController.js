const mongoose = require('mongoose');
const Order = require('./../../models/orderModel');
const User = require('./../../models/userModel');
const orderService = require('./orderService');
const userService = require('./../user/userService');

exports.getOrdersData = async (req, res, next) => {
    try {
        console.log('Getting all orders');
        const orders = await orderService.getOrders();

        res.status(200).json({
            status: 'success',
            data: orders,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getOrderData = async (req, res, next) => {
    try {
        const order = await orderService.getOrder(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (err) {
        console.log(err);
    }
};
exports.createOrder = async (req, res, next) => {
    try {
        //Creating order to DB
        const newOrder = await orderService.createOrder(req.body);
        //Logging order and getting updated user.
        let userAfterLog = await orderService.logOrder(newOrder);

        // Handling market Orders
        if (newOrder.orderType === 'market') {
            let updatedUser = await orderService.executeMarketOrder(newOrder, userAfterLog);
            res.status(200).json({
                status: 'success',
                data: {
                    updatedUser,
                    newOrder,
                },
            });
            // Will handle limit orders in the future.
        } else {
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            });
        }
    } catch (err) {
        console.log(err);
        console.log('err on porpuse will it move to logging');
        next();
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.deleteOneById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch {}
};

exports.updateOrder = async (req, res, next) => {
    try {
    } catch (err) {}
};
