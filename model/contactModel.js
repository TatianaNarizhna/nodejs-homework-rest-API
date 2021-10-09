const { Schema, model } = require('mongoose');
const { ValidInfoContact } = require('../config/constant');

const contactSchema = new Schema({
    name: {
        type: String,
        min: ValidInfoContact.MIN_MANE,
        max: ValidInfoContact.MAX_NAME,
        required: [true, 'Set a name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set an email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set a phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false, 
    timestamps: true, 
    toJSON: { virtuals: true,
        transform: function (doc, ret) {
            delete ret._id
            return ret;
        },
    },
    toObject: { virtuals: true }
});

const Contact = model('contact', contactSchema);

module.exports = Contact;


//     "name": "Allen Raymond",
// "email": "nulla.ante@vestibul.co.uk",
// "phone": "(992) 914-3792",
// "favorite": false