const { Schema, model, SchemaTypes } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { Subscript } = require('../config/constants');

const SALT_FACTOR = 6;

const userScheme = new Schema ({
    name: {
        type: SchemaTypes.String,
        default: 'Guest',
    },
    email: {
        type: SchemaTypes.String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /^.+@.+\..+$/
            return re.test(String(value).toLowerCase())
        }
    },
    password: {
        type: SchemaTypes.String,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: SchemaTypes.String,
        enum: {
            values: [Subscript.STARTER, Subscript.PRO, Subscript.BUSINESS],
            message: 'It is not allowed'
        },
        default: Subscript.STARTER,
    },
    token: {
        type: SchemaTypes.String,
        default: null,
    },
    avatar: {
        type: SchemaTypes.String,
        default: function () {
            return gravatar.url(this.email, 
            { s: '250' }, 
            true);
        }
    }
},
{
    versionKey: false, 
    timestamps: true, 
    toJSON: { 
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id
            return ret;
        },
    },
    toObject: { virtuals: true }
}
);

userScheme.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(SALT_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userScheme.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model('user', userScheme);

module.exports = User;