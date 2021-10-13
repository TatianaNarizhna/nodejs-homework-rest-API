const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { Gender } = require('../config/constants');

const SALT_FACTOR = 6;

const userScheme = new Schema ({
    name: {
        type: String,
        default: 'Guest',
    },
    email: {
        type: String,
        required: [true, 'Enter the email for contact'],
        unique: true,
        validate(value) {
            const re = /^.+@.+\..+$/
            return re.test(String(value).toLowerCase())
        }
    },
    password: {
        type: String,
        required: [true, 'Enter the password for contact'],
    },
    gender: {
        type: String,
        enum: {
            values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
            message: 'This gender not allowed'
        },
        default: Gender.NONE,
    },
    token: {
        type: String,
        default: null,
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
})

const User = model('user', userScheme);

module.exports = User;