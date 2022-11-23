const express = require('express');
const coinController = require('./coinController');
const router = express.Router();

router.route('/').get(coinController.getCoinsData).post(coinController.createCoins);
router.route('/:id').get(coinController.getCoinData);

module.exports = router;
