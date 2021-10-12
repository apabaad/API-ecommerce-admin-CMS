import express from 'express'
import slugify from 'slugify'
const Router = express.Router()
import {
    createProduct,
    getProducts,
    getSingleProduct,
    getSingleProductByID,
    updateProduct,
    deleteProductById,
    updateProductById,
} from '../modals/product/Product.model.js'

import { newProductFormValidation } from '../middlewares/productValidation.middleware.js'

// create new product
Router.post('/', newProductFormValidation, async (req, res) => {
    try {
        // create slug

        const { title } = req.body
        const slug = slugify(title, { lower: true })

        const result = await createProduct({ ...req.body, slug })
        if (result?._id) {
            res.json({
                status: 'success',
                message: 'Product added',
            })
        }
        res.json({
            status: 'error',
            message: 'Unable to add product.',
        })
    } catch (error) {
        let msg = error.message
        if (msg.includes('E11000 duplicate key error collection')) {
            msg = 'The product slug already exists.'
        }
        res.json({
            status: 'error',
            message: msg,
        })
    }
})

export default Router
