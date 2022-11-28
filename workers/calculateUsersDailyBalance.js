const { parentPort, workerData } = require('node:worker_threads');

parentPort.on('message', async (usersData) => {
    const updatedUsers = calculateDailyBalance(JSON.parse(usersData));
    const bulkUpdateOps = createArrayForBulkOperation(updatedUsers);
    parentPort.postMessage({ bulkUpdateOps });
});

function calculateDailyBalance(usersData) {
    const updatedUsers = usersData.map((user) => {
        const userCoinBalance = user.walletCoins.reduce((totalBalance, coin) => {
            return totalBalance + coin.amount * coin.coinType.current_price;
        }, 0);
        user.dailyTotalBalance.push({ totalBalance: userCoinBalance + user.balance, date: Date.now() });
        return user;
    });

    return updatedUsers;
}
function createArrayForBulkOperation(users) {
    const bulkUpdateOps = users.map((user) => {
        return {
            updateOne: {
                filter: { _id: user.id },
                update: { $set: { dailyTotalBalance: user.dailyTotalBalance } },
            },
        };
    });
    console.log('BULK ARRAY:', bulkUpdateOps);
    return bulkUpdateOps;
}
