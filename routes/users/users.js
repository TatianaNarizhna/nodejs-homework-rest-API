const express = require('express');
const router = express.Router();
const { registration, login, logout } = require('../../controllers/usersController');

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
