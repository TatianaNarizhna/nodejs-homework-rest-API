const { Schema, model, SchemaTypes } = require('mongoose');
const { ValidInfoName } = require('../config/constants');

const contactSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        min: ValidInfoName.MIN_NAME,
        max: ValidInfoName.MAX_NAME,
        required: [true, 'Set a name for contact'],
    },
    email: {
        type: SchemaTypes.String,
        required: [true, 'Set an email for contact'],
    },
    phone: {
        type: SchemaTypes.String,
        required: [true, 'Set a phone for contact'],
    },
    favorite: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
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