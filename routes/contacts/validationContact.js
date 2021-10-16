const Joi = require('joi');
const { ValidInfoName } = require('../../config/constants');

const schemaContact = Joi.object({
    name: Joi.string().min(ValidInfoName.MIN_NAME)
      .max(ValidInfoName.MAX_NAME).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp('^.[0-9]{3}. [0-9]{3}-[0-9]{4}$'))
      .required(),
      favorite: Joi.boolean().optional(),
});

const schemeStatusContact = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemaId = Joi.object({
    contactId: Joi.string().required()
})

const validateContact = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (error) {
        res.status(400)
        .json({ status: 'error', code: 400, 
        message: 'missing required name field' })
    }
};

const validateBody = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (error) {
        res.status(400)
        .json({ status: 'error', code: 400, 
        message: 'missing fields'})
    }
};

const validateStatus = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (error) {
        res.status(400)
        .json({ status: 'error', code: 400, 
        message: 'missing field favorite' })
    }
};

 const validateId = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (error) {
        res.status(400)
        .json({ status: 'error', code: 400, 
        message: `Field ${error.message.replace(/"/g, '')}` })
    }
};


module.exports.validateContact = async (req, res, next) => {
   return await validateContact(schemaContact, req.body, res, next)
};

 module.exports.validateBody = async (req, res, next) => {
    return await validateBody(schemaContact, req.body, res, next)
 };

 module.exports.validateStatus = async (req, res, next) => {
    return await validateStatus(schemeStatusContact, req.body, res, next)
 };

 module.exports.validateId = async (req, res, next) => {
    return await validateId(schemaId, req.params, res, next)
 };
