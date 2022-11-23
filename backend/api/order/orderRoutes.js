const orderController = require('./orderController');
const express = require('express');
const router = express.Router();

// router.route('/orders-for-worker').get(orderController.getOrdersForWorker);
// router.route('/fulfill').post(orderController.fulfillOrder);
router.route('/').get(orderController.getOrdersData).post(orderController.createOrder);
router.route('/:id').get(orderController.getOrderData);

module.exports = router;
// , orderController.logOrder, orderController.fulfillOrder
