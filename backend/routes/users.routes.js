const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const verifyToken = require("../middleware/auth"); // make sure this attaches req.user
const router = Router();

// Routes
router.get('/', verifyToken, requireAdmin, usersController.getAllUsers);   // admin only
router.post('/', usersController.createUser);                             // open (or protect if needed)
router.get('/:id', usersController.getUserById);                          // open (or protect if needed)
router.put('/:id', verifyToken, requireAdmin, usersController.updateUser); // admin only
router.delete('/:id', verifyToken, requireAdmin, usersController.deleteUser); // admin only

module.exports = router;
