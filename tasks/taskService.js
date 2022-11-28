const userService = require('./../api/user/userService');

exports.getUsersForWorker = async () => {
    try {
        const users = await userService.getUsers();
        return users;
    } catch (err) {
        console.log('Couldnt Get Users For Worker');
    }
};
exports.updateUsersDailyBalanceAfterWork = async (bulkUpdateOps) => {
    try {
        await userService.bulkUpdateUsers(bulkUpdateOps);
    } catch (err) {
        console.log(err);
    }
};
