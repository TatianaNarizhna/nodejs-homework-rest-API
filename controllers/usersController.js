const jwt = require('jsonwebtoken');
const Users = require('../dataBase/users');
const { HttpCode } = require('../config/constants');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
    const { name, email, password, subscription } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
        return res
        .status(HttpCode.CONFLICT)
        .json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already exist',
        })
    }
    try {
        const newUser =  await Users.createNewUser({ name, email, password, subscription })
        return res
        .status(HttpCode.CREATED)
        .json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                subscription: newUser.subscription,
            },
        })
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user.isValidPassword(password);
    if (!user || !isValidPassword) {
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong',
        })
    }
    const id = user._id;
    const payload = {id};
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const subscription = user.subscription;
    await Users.updateToken(id, token, email, subscription );
    return res
        .status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            date: {
                token,
                email,
                subscription,
            }
        })
};

const logout = async (req, res, next) => {
    const id = req.user._id;
    if (!id) {
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
        })
    }
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (!user ) {
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
        })
    }
    const subscription = user.subscription;
    return res
        .status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            date: {
                email,
                subscription,
            }
        })
}

module.exports = {
    registration,
    login,
    logout,
    currentUser,
}