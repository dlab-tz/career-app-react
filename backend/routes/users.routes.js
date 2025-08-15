const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const router = Router();
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/', usersController.getUserById);
router.put('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);
module.exports = router;