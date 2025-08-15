const { Router } = require('express');
const usersController = require('../controllers/users.controller')

const router = Router();
router.get('/', usersController.getAllUsers)
router.put('/:userId', usersController.updateUser);
module.exports = router

router.put