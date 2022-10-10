const express = require('express');
const userController = require('./userController');
const router = express.Router();

router.route('/').get(userController.getUsers);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);
exports.router = router;
