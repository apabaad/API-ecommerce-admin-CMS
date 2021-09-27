import express from 'express'
import slugify from 'slugify'
const Router = express.Router()

import { createCategory } from '../modals/category/Category.modal.js'
import { newCategoryValidation } from '../middlewares/validation.middleware.js'

Router.all('/', (req, res, next) => {
    console.log('from cat router')

    next()
})

// for category
Router.post('/', newCategoryValidation, async (req, res) => {
    try {
        console.log(req.body)
        const { name, parentCat } = req.body

        // slugify
        const slug = slugify(name, { lower: true })
        const newCat = {
            name,
            slug,
            parentCat,
        }

        // insert into database
        const result = await createCategory(newCat)
        console.log(result)

        if (result?._id) {
            return res.json({
                status: 'success',
                message: 'category has been created',
            })
        }
    } catch (error) {
        let msg = 'Unable to process your request. Please try later'

        if (error.message.includes('E11000 duplicate key error collection')) {
            msg = 'Category already exists'
        }
        res.status(500).json({
            status: 'error',
            message: msg,
        })
    }
})

export default Router
