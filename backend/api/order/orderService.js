const Order = require('./../../models/orderModel');
const User = require('./../../models/userModel');
const userService = require('./../user/userService');
exports.sayHello = () => {
    console.log('Saying hello');
};
exports.getOrders = async () => {
    try {
        console.log('getting orders from service');
        const orders = await Order.find();
        return orders;
    } catch (err) {
        console.log(err);
    }
};
exports.getOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('coin').populate('user');
        return order;
    } catch (err) {
        console.log(err);
    }
};
exports.createOrder = async (orderData) => {
    try {
        let newOrder = await Order.create(orderData);
        newOrder = await newOrder.populate('coin').execPopulate();
        return newOrder;
    } catch (err) {
        console.log(err);
    }
};
exports.logOrder = async ({ user: userId, coin, amount, price, actionType, orderType }) => {
    try {
        const coinCopy = JSON.parse(JSON.stringify(coin));
        const description = `Call to place ${orderType === 'market' ? 'market' : 'limit'} order to ${
            actionType === 'buy' ? 'buy' : 'sell'
        } ${amount} shares of symbol ${coinCopy.symbol.toUpperCase()} with price of ${price}$`;

        const updatedUser = await userService.logUserAction({ description, data: Date.now() }, userId);
        return updatedUser;
    } catch (err) {
        console.log(err);
    }
};

exports.executeMarketOrder = async (orderData, user) => {
    try {
        const updatedUser = userService.fulfillOrder(orderData, user);
        return updatedUser;
    } catch (err) {
        console.log(err);
    }
};
exports.executeLimitOrder = async () => {
    try {
    } catch (err) {
        console.log(err);
    }
};
// exports.getOrders = async () => {
//     try {
//     } catch (err) {
//         console.log(err);
//     }
// };
// exports.getOrders = async () => {
//     try {
//     } catch (err) {
//         console.log(err);
//     }
// };
// exports.getOrders = async () => {
//     try {
//     } catch (err) {
//         console.log(err);
//     }
// };
