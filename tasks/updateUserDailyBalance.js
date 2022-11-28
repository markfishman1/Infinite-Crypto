const { Worker, isMainThread, parentPort, workerData, setEnvironmentData } = require('node:worker_threads');
const taskService = require('./taskService');
const util = require('util');

exports.updateUserBalance = async () => {
    try {
        const users = await taskService.getUsersForWorker();
        const usersCopy = JSON.stringify(users);
        const worker = new Worker('./workers/calculateUsersDailyBalance.js');
        worker.on('message', ({ bulkUpdateOps }) => {
            // console.log('Bulk Array', util.inspect(bulkUpdateOps, false, null, true));
            taskService.updateUsersDailyBalanceAfterWork(bulkUpdateOps);
        });
        worker.on('error', (error) => {
            console.log(error);
        });
        worker.postMessage(usersCopy);
    } catch (err) {
        console.log(err);
    }
};
