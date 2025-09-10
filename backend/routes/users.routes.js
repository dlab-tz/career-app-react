const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const { auth, adminOnly } = require("../middleware/auth");

const router = Router();

// Admin-only: list all users
router.get('/', auth, adminOnly, usersController.getAllUsers);

//Public: register a new user
router.post('/', usersController.createUser);

//Admin-only: get user by ID
router.get('/:id', auth, adminOnly, usersController.getUserById);

// Admin-only: update user
router.put('/:id', auth, adminOnly, usersController.updateUser);

//Admin-only: delete user
router.delete('/:id', auth, adminOnly, usersController.deleteUser);

//Public: verify email
router.get('/verify-email/:userId', usersController.verifyEmail);

module.exports = router;