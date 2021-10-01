const Joi = require('joi');

const schemaContact = Joi.object({
    "name": Joi.string().alphanum().min(1).max(15).required(),

    "email": Joi.string().email({
        minDomainSegments: 2, tlds: { allow: ['com', 'net']}
      })
      .required(),

    "phone": Joi.number().integer().min(3).max(20).required(),
});


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


module.exports.validateContact = async (req, res, next) => {
   return await validateContact(schemaContact, req.body, res, next)
};

 module.exports.validateBody = async (req, res, next) => {
    return await validateBody(schemaContact, req.body, res, next)
 };







//  const pattern = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}';

// const schemaId = Joi.object({
//     contactId: Joi.string().pattern(new RegExp(pattern)).required()
// })

//  const validateId = async (schema, obj, res, next) => {
//     try {
//         await schema.validateAsync(obj)
//         next()
//     } catch (error) {
//         res.status(400)
//         .json({ status: 'error', code: 400, 
//         message: `Field ${error.message.replace(/"/g, '')}` })
//     }
// };

//  module.exports.validateId = async (req, res, next) => {
//     return await validateId(schemaId, req.params, res, next)
//  };
