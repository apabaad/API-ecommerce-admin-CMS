import express from 'express'
import slugify from 'slugify'
import multer from 'multer'
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

import {
    newProductFormValidation,
    updateProductFormValidation,
} from '../middlewares/productValidation.middleware.js'

// get all or single product

Router.get('/:slug?', async (req, res) => {
    try {
        const { slug } = req.params
        let result = null
        if (slug) {
            result = await getSingleProduct({ slug })
        } else {
            result = await getProducts()
        }

        res.json({
            status: 'success',
            message: 'Product as requested',
            result,
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})

// create new product for non multi part
// Router.post('/', newProductFormValidation, async (req, res) => {
//     try {
//         // create slug

//         const { title } = req.body
//         const slug = slugify(title, { lower: true })

//         const result = await createProduct({ ...req.body, slug })
//         if (result?._id) {
//             res.json({
//                 status: 'success',
//                 message: 'Product added',
//             })
//         }
//         res.json({
//             status: 'error',
//             message: 'Unable to add product.',
//         })
//     } catch (error) {
//         let msg = error.message
//         if (msg.includes('E11000 duplicate key error collection')) {
//             msg = 'The product slug already exists.'
//         }
//         res.json({
//             status: 'error',
//             message: msg,
//         })
//     }
// })

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let error = null
        // validation

        cb(error, 'public/img/product')
    },
    filename: function (req, file, cb) {
        const fileNameArg = file.originalname.split('.')
        const name = fileNameArg[0]
        const ext = fileNameArg[fileNameArg.length - 1]
        const uniqueVal = Date.now()

        const fileName = slugify(name) + uniqueVal + '.' + ext
        cb(null, fileName)
    },
})

const upload = multer({ storage })

// create form for multi part/ form data i.e enctype: multipart/formdata

Router.post(
    '/',
    upload.array('images', 5),
    newProductFormValidation,
    async (req, res) => {
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
    }
)

// Update product //put to update all doc based on id
Router.put('/', updateProductFormValidation, async (req, res) => {
    try {
        console.log(req.body)

        // 1. server side validation
        // 2. Update in db

        const { _id, ...product } = req.body
        const result = await updateProductById(_id, product)

        if (result?._id) {
            return res.json({
                status: 'success',
                message: 'product updated',
            })
        }
        res.json({
            status: 'Error',
            message: 'still not done',
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})

// Delete product
Router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        const product = await deleteProductById(_id)
        if (product?._id) {
            return res.json({
                status: 'success',
                message: 'The product has been deleted',
            })
        }

        res.json({
            status: 'error',
            message: 'Unable to delete. Try later.',
        })
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message,
        })
    }
})
export default Router
