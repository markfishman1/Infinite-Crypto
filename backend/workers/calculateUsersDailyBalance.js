const { parentPort, workerData, getEnvironmentData } = require('node:worker_threads');
parentPort.on('message', (message) => parentPort.postMessage({ pong: message }));
const users = JSON.parse(workerData);

const updatedUsers = users.map((user) => {
    const userCoinBalance = user.walletCoins.reduce((totalBalance, coin) => {
        // console.log('Coin:', coin);
        console.log('Coin Amount:', coin.amount);
        console.log('Coin Avg Price:', coin.avgPrice);
        console.log('Coin Symbol:', coin.coinType.symbol);
        console.log('Total Balance:', totalBalance);
        return totalBalance + coin.amount * coin.coinType.current_price;
    }, 0);
    console.log('TOTAL BALANCE:', userCoinBalance);
    console.log('user daily balances before:', user.dailyTotalBalance);
    user.dailyTotalBalance.push({ totalBalance: userCoinBalance + user.balance, date: Date.now() });
    console.log('user daily balances after:', user.dailyTotalBalance);
});
console.log('UPDATED USERS:', users);
// const data = getEnvironmentData();
// console.log(data, 'from worker');
