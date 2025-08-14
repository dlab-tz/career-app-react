const { Router } = require('express');
const usersController = require('../controllers/users.controller')

const router = Router();
router.get('/', usersController.getAllUsers)
module.exports = router