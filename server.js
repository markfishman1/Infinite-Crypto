const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const { updateUserBalance } = require('./tasks/updateUserDailyBalance');
// setInterval(calculateUserBalance, 2000);
// const DB = process.env.DATABASE.replace('<PASSWORD>', '5BXsXSc6Q137kAaQ');
// const DB = process.env.DATABASE2.replace('<PASSWORD>', process.env.DB_PASSWORD);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
// const DB = process.env.DATABASEV2.replace('<PASSWORD>', process.env.DBV2_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log('Db Connection successful');
        // updateUserBalance();
        // setInterval(updateUserBalance, 2400000);
    });

console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
