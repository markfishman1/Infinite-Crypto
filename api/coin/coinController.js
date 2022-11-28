const Coin = require('../../models/coinModel');
const AppError = require('../../utils/appError');
const coinService = require('./coinService');

exports.createCoins = async (req, res, next) => {
    try {
        const coinsData = req.body;
        const coins = await coinService.createCoinsCollection(coinsData);
        console.log('COINSS HEREEE!!!!!:', coins.splice(0, 5));
        res.status(201).json({
            status: 'success',
            data: {
                coins,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
exports.getCoinsData = async (req, res, next) => {
    try {
        const coins = await coinService.getCoins();
        if (!coin) {
            return next(new AppError('No coin found with that ID'), 404);
        }
        res.status(201).json({
            status: 'success',
            data: {
                coins,
            },
        });
    } catch (err) {}
};
exports.getCoinData = async (req, res, next) => {
    try {
        const coin = await coinService.getCoinById(req.params.id);
        res.status(201).json({
            status: 'success',
            data: {
                coin,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
