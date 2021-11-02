const jwt = require('jsonwebtoken');
const mkdirp = require('mkdirp');
const path = require('path');
const Users = require('../dataBase/users');
const UploadAvatar = require('../services/fileUpload');
const { HttpCode } = require('../config/constants');
const EmailService = require('../services/email/emailService');
const {
    CreateSenderSendGrid, CreateSenderNodemailer
} = require('../services/email/sender');

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
        // TODO: verify user
        const newUser =  await Users.createNewUser({ name, email, password, subscription })
        const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderSendGrid())

        const statusEmail = await emailService.sendVerifyEmail( 
        newUser.email, 
        newUser.name, 
        newUser.verifyToken,
        )

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
                avatar: newUser.avatar,
                successEmail: statusEmail,
            },
        })
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!user || !isValidPassword || !user?.verify) {
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
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
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
    const { email, subscription } = req.user;

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

const uploadAvatar = async (req, res, next) => {
    const id = String(req.user._id);
    const file = req.file;
    const USERS_AVATAR = process.env.USERS_AVATAR;
    const destination = path.join(USERS_AVATAR, id);
    await mkdirp(destination);
    const uploadAvatar = new UploadAvatar(destination);
    const avatarUrl = await uploadAvatar.save(file, id);
    await Users.updateAvatar(id, avatarUrl);
  
    return res.status(HttpCode.OK).json({ 
        status: 'success',
        code: HttpCode.OK,
        date: {
            avatarURL : avatarUrl,
        }
    });
};

const verifyUser = async (req, res, next) => {
        const user = await Users.findUserByVerifyToken(req.params.token)
        if (user) {
            await Users.updateTokenVerify(user._id, true, null)
            return res
            .status(HttpCode.OK)
            .json({
             status: 'success',
             code: HttpCode.OK,
             date: {
               message: 'Verification successful'
             }
           })
        }
        return res
        .status(HttpCode.BAD_REQUEST)
        .json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: 'User not found',
        })
}

const repeatEmailForverifyUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
        const { email, name, verifyToken } = user
        const emailService = new EmailService(process.env.NODE_ENV, new CreateSenderNodemailer())

        const statusEmail = await emailService.sendVerifyEmail( 
        email, 
        name, 
        verifyToken,
        )
     }
     if ( !email ) {
         return res
         .status(HttpCode.BAD_REQUEST)
         .json({
             status: 'error',
             code: HttpCode.BAD_REQUEST,
             date: {
                 message: 'Missing required field email',
             }
         })
     }
       return res
      .status(HttpCode.OK)
      .json({
       status: 'success',
       code: HttpCode.OK,
       date: {
         message: 'Verification has already been passed'
       }
     })
}

module.exports = {
    registration,
    login,
    logout,
    currentUser,
    uploadAvatar,
    verifyUser,
    repeatEmailForverifyUser,
}