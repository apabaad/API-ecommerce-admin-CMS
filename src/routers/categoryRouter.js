import express from 'express'
import slugify from 'slugify'
const Router = express.Router()

import {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from '../modals/category/Category.modal.js'
import {
    newCategoryValidation,
    updateCategoryValidation,
} from '../middlewares/validation.middleware.js'

Router.all('/', (req, res, next) => {
    console.log('from cat router')

    next()
})

// create category
Router.post('/', newCategoryValidation, async (req, res) => {
    try {
        console.log(req.body)
        const { name, parentCat } = req.body

        // slugify
        const slug = slugify(name, { lower: true })
        const newCat = {
            name,
            slug,
            parentCat: parentCat ? parentCat : null,
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
        res.json({
            status: 'error',
            message: msg,
        })
    }
})

//get category
Router.get('/', async (req, res) => {
    try {
        const categories = await getCategory()

        res.json({
            status: 'success',
            message: 'request success',
            categories,
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            status: 'error',
            message:
                'Error, Unable to process your request please try again later',
        })
    }
})

//delete category
Router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params //.params gets :_id from the url

        if (result?._id) {
            return res.json({
                status: 'success',
                message: 'category has been deleted',
            })
        }

        res.json({
            status: 'error',
            message: 'Unable to delete. Please try later',
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            status: 'error',
            message: 'Unable to delete. Please try later',
        })
    }
})

// update category
Router.patch('/', updateCategoryValidation, async (req, res) => {
    try {
        const { parentCat } = req.body
        req.body.parentCat = parentCat ? parentCat : null

        const { _id, ...catObj } = req.body //.params gets :_id from the url
        const result = await updateCategory(_id, catObj)

        if (result?._id) {
            return res.json({
                status: 'success',
                message: 'category has been updated',
            })
        }

        res.json({
            status: 'error',
            message: 'Unable to update. Please try later',
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({
            status: 'error',
            message: 'Unable to update. Please try later',
        })
    }
})

export default Router
