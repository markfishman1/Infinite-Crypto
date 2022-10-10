const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Db Connection successful');
    });

console.log(app.get('env'));
// console.log(process.env);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
