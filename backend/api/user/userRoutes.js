const express = require('express');
const userController = require('./userController');
const router = express.Router();

router.route('/').get(userController.getUsersData);
router.route('/:id').get(userController.getUserData).patch(userController.updateUser).delete(userController.deleteUser);
module.exports = router;
