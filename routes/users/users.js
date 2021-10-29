const express = require('express');
const router = express.Router();
const { registration, 
    login, logout, 
    currentUser, 
    uploadAvatar, 
    verifyUser, 
    repeatEmailForverifyUser } = require('../../controllers/usersController');
const guard = require('../../helpers/guard');
const limiter = require('../../helpers/rate-limit-login');
const { validateUser } = require('./validationUser');
const uploads = require('../../helpers/uploads');
const wrapperErr = require('../../helpers/errorHandler');

router.post('/registration', limiter, validateUser, registration);
router.post('/login', limiter, validateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, validateUser, currentUser);
router.patch('/avatar',guard, uploads.single('avatar'), uploadAvatar);

router.get('/verify/:token', wrapperErr(verifyUser));
router.post('/verify', wrapperErr(repeatEmailForverifyUser));

module.exports = router;
