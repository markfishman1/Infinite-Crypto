const mongoose = require('mongoose');
// const Schema = Mongoose.Schema;
const coinSchema = new mongoose.Schema({}, { strict: false });
const Coin = mongoose.model('Coin', coinSchema);
module.exports = Coin;
