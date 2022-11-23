const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },
        price: {
            type: Number,
            required: ['true', 'Order must have price'],
        },
        amount: {
            type: Number,
            required: ['true', 'Order must have a coin amount'],
        },
        orderType: {
            type: String,
            enum: ['market', 'limit'],
            required: ['true', 'Order must have a type'],
        },
        actionType: {
            type: String,
            enum: ['buy', 'sell'],
            required: ['true', 'Order must be a sell or buy'],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: ['true', 'Order must belong to a user'],
        },
        coin: {
            type: mongoose.Schema.ObjectId,
            ref: 'Coin',
            required: ['true', 'Order must contain a coin'],
        },
        status: {
            type: String,
            enum: ['fulfilled', 'rejected', 'cancelled', 'working'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
orderSchema.pre(/^create/, function (next) {
    this.populate('user');
    this.populate('coin');
    console.log('Pre Populate');
    next();
});
orderSchema.pre(/^find/, function (next) {
    this.select('-__v');
    next();
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
/// Order ,type:long/short/stopLoss/normal,bougthAt,soldAt,coinId-refference/
/*
type of orders:
One Cancels other,
limit,
market,

Order Model:{
    userId,
    coinId,
    type:buy/sell,
    amount,
    stopLoss:{
        active:true/false,
        price:
        amount:
    },
    takeProfit:{
        active:true/false,
        price:
        amount:
    },
}


order Model #2:{
    userId,
    coinId,
    price,
    amount,
    type:market/limit
    action:buy/sell
}

*/
