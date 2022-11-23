const User = require('./../../models/userModel');

exports.getUsers = async () => {
    try {
        const users = await User.find().populate('walletCoins.coinType');
        return users;
    } catch (err) {}
};
exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate('walletCoins.coinType');
        return user;
    } catch (err) {}
};
exports.logUserAction = async (logData, userId) => {
    try {
        console.log('USER ID:', userId);
        const user = await User.findById(userId).populate('walletCoins.coinType');
        console.log('USER FROM LOGUSERACTION,', user);
        user.tradingJournal.push(logData);
        return user;
    } catch (err) {}
};
exports.fulfillOrder = async ({ user: userId, coin, amount, price, actionType }, user) => {
    try {
        const ACTION = actionType === 'buy' ? 1 : -1;
        const idx = user.walletCoins.findIndex(
            (walletCoin) => JSON.stringify(walletCoin.coinType._id) === JSON.stringify(coin._id)
        );
        console.log('IDX:', idx);
        const selectedCoin = user.walletCoins[idx];
        console.log('SelectedCoin:', selectedCoin);
        if (selectedCoin) {
            selectedCoin.avgPrice =
                (selectedCoin.avgPrice * selectedCoin.amount + price * amount) / (amount + selectedCoin.amount);
            selectedCoin.amount = selectedCoin.amount + amount * ACTION;
            if (selectedCoin.amount === 0) {
                user.walletCoins.splice(idx, 1);
            }
        } else {
            console.log('No such coin');
            user.walletCoins.push({ coinType: coin._id, amount, avgPrice: price });
        }
        user.balance -= amount * ACTION * price;
        const updatedUser = await User.findByIdAndUpdate(userId, user);
        return updatedUser;
    } catch (err) {}
};
exports.getUser = async () => {
    try {
    } catch (err) {}
};
exports.getUser = async () => {
    try {
    } catch (err) {}
};
