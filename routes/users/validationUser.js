const Joi = require('joi');

const schemaUser = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.number()
    // eslint-disable-next-line prefer-regex-literals
    // .pattern(new RegExp('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'))
    .required(),
})

// Должно содержать по крайней мере одно число, одну заглавную и строчную буквы,
//  а также не менее 8 и более символов. 

const validateUser = async (schema, obj, res, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (error) {
        res.status(400)
        .json({ status: 'error', code: 400, 
        message: 'missing required name field' })
    }
}

module.exports.validateUser = async (req, res, next) => {
    return await validateUser(schemaUser, req.body, res, next)
};
