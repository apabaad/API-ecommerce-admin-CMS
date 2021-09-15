import Joi from 'joi'

export const newUserFormValidation = (req, res, next) => {
    const schema = Joi.object({
        fname: Joi.string().max(30).required(),
        lname: Joi.string().max(30).required(),
        date: Joi.date(),
        email: Joi.string().email({ minDomainSegments: 2 }),
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
