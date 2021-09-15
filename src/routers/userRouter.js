import express from 'express'
const Router = express.Router()

import { createUser } from '../modals/user/User.modal.js'
import { newUserFormValidation } from '../middlewares/validation.middleware.js'
Router.all('/', (req, res, next) => {
    next()
})

Router.post('/', newUserFormValidation, async (req, res) => {
    try {
        const result = await createUser(req.body)
        console.log(result)
        if (result?._id) {
            return res.json({
                status: 'ok',
                message: 'User created. Please verify your email',
                result,
            })
        }

        res.json({
            status: 'error',
            message: 'Unable to create user',
        })
    } catch (error) {
        console.log(error)
        let msg = 'Error, unable to create new user. Please contact admin'
        if (error.message.includes('E11000 duplicate key error collection')) {
            msg = 'Email already registered.'
        }
        res.json({
            status: 'error',
            message: msg,
        })
    }
})

// Router.get()

// Router.patch()
// Router.delete()

export default Router
