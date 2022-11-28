const Coin = require('../../models/coinModel');

exports.createCoinsCollection = async (coinsData) => {
    try {
        let coins = await Coin.find();
        if (!coins || coins.length === 0) {
            coins = await Coin.create(coinsData, { strict: false });
        } else {
            // await Coin.deleteMany();
            // coins = await Coin.create(coinsData, { strict: false });
            console.log('Updating');
            const res = await Coin.updateMany({ coinsData });
            console.log('Res');
            console.log('Finding');
            coins = await Coin.find().select('-__v');
        }
        return coins;
    } catch (err) {
        console.log(err, 'No coins found');
    }
};
exports.getCoins = async () => {
    try {
        const coins = await Coin.find().select('-__v');
        return coins;
    } catch (err) {
        console.log(err, 'No coins found');
    }
};
exports.getCoinById = async (coinId) => {
    try {
        const coin = await Coin.findById(coinId);
        console.log(coin);
        return coin;
    } catch (err) {
        console.log(err, 'No coin found with that id');
    }
};
