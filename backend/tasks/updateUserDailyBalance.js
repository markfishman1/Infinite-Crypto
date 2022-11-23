const { Worker, isMainThread, parentPort, workerData, setEnvironmentData } = require('node:worker_threads');
const User = require('../models/userModel');
exports.updateUserBalance = async () => {
    try {
        const users = await User.find().populate('walletCoins.coinType');
        // console.log(users, 'From Task');
        const usersCopy = JSON.stringify(users);
        if (isMainThread) {
            setEnvironmentData(users);
            const worker = new Worker('./workers/calculateUsersDailyBalance.js', { workerData: usersCopy });
            worker.on('message', (msg) => {
                console.log(msg);
            });
        } else {
            console.log('not main thread');
        }
    } catch (err) {
        console.log(err);
    }
};
