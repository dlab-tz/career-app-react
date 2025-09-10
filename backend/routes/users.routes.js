
const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const verifyToken = require("../middleware/auth");
const auth =require("../middleware/auth");
const router = Router();

// Routes
router.get('/', verifyToken, usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/verify-email/:userId', usersController.verifyEmail);
module.exports = router;
