const express = require('express');
const router = express.Router();
const { registration, login, logout, currentUser } = require('../../controllers/usersController');
const guard = require('../../helpers/guard');
const limiter = require('../../helpers/rate-limit-login');
const { validateUser } = require('./validationUser');

router.post('/registration', limiter, validateUser, registration);
router.post('/login', limiter, validateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, validateUser, currentUser);

module.exports = router;
