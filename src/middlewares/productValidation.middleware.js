import Joi from 'joi'

const bool = Joi.boolean()
const slug = Joi.string().max(30).required()
const title = Joi.string().max(100).required()
const price = Joi.number().max(10000).required()
const description = Joi.string().max(3000).required()
const longStr = Joi.string().max(3000)
const shortStr = Joi.string().max(120)
const date = Joi.date().allow('').allow(null)
const num = Joi.number().max(10000)
const _id = Joi.string().max(30)

export const newProductFormValidation = (req, res, next) => {
    console.log(req.body)

    const schema = Joi.object({
        status: bool,
        title,
        price: price,
        qty: num,
        description,
        categories: longStr.required(),
        salePrice: num,
        saleStartDate: date,
        saleEndDate: date,
        brand: shortStr,
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
export const updateProductFormValidation = (req, res, next) => {
    const schema = Joi.object({
        _id,
        status: bool.required(),
        title,
        price: price,
        qty: num,
        images: Joi.array(),
        imgToDelete: Joi.array(),
        oldImages: longStr,
        description,
        categories: longStr.required(),

        salePrice: num,
        saleStartDate: date,
        saleEndDate: date,
        brand: shortStr,
    })

    const result = schema.validate(req.body)

    if (result.error) {
        return res.json({
            status: 'error',
            message: result.error.message,
        })
    }

    const { categories, images, imgToDelete } = req.body
    req.body.categories = categories.split(',')
    req.body.images = images.split(',')
    req.body.imgToDelete = imgToDelete.split(',')

    next()
}
