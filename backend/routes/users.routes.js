const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const verifyToken = require("../middleware/auth");
const router = Router();

router.get('/',verifyToken, usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id',verifyToken, usersController.getUserById);
router.put('/:id',verifyToken, usersController.updateUser);
router.delete('/:id', verifyToken,usersController.deleteUser);

module.exports = router;