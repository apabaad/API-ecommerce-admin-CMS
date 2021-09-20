import Joi from 'joi'

const shortStr = Joi.string().alphanum().max(30).required()
const email = Joi.string().email({ minDomainSegments: 2 })
export const newUserFormValidation = (req, res, next) => {
    const schema = Joi.object({
        fname: shortStr,
        lname: Joi.string().max(30).required(),
        dob: Joi.date(),
        email: email,
        password: Joi.string().min(6).max(50).required(),
        phone: Joi.string().max(15),
        address: Joi.string().max(50),
        gender: Joi.string().max(6),
    })

    const result = schema.validate(req.body)

    if (result.error) {
        return res.json({
            status: 'error',
            message: result.error.message,
        })
    }
    next()
}

export const emailVerificationValidation = (req, res, next) => {
    const schema = Joi.object({
        otp: shortStr,
        email: email.required(),
    })
    const result = schema.validate(req.body)

    if (result.error) {
        return res.json({
            status: 'error',
            message: result.error.message,
        })
    }
    next()
}
