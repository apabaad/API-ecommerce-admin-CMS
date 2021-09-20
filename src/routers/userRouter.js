import express from 'express'
const Router = express.Router()

import { createUser } from '../modals/user/User.modal.js'
import { createUniqueReset } from '../modals/reset-pin/ResetPin.modal.js'
import { newUserFormValidation } from '../middlewares/validation.middleware.js'
import { hashPassword } from '../helpers/bcrypt.helper.js'
import { getRandomOTP } from '../helpers/otp.helper.js'
import { emailProcessor } from '../helpers/mail.helper.js'

Router.all('/', (req, res, next) => {
    next()
})

Router.post('/', newUserFormValidation, async (req, res) => {
    try {
        // hash password
        const t1 = Date.now()
        const hashPass = hashPassword(req.body.password)
        const t2 = Date.now()
        console.log(hashPass, 'time taken = ' + (t2 - t1) + 'ms')

        req.body.password = hashPass
        const result = await createUser(req.body)
        console.log('result', result)
        if (result?._id) {
            // create unique code
            const otpLength = 8
            const otp = getRandomOTP(otpLength)

            const uniqueCombo = {
                otp,
                email: result.email,
            }
            const data = await createUniqueReset(uniqueCombo)
            console.log('from routet', data)

            // send email to client with unique verification link
            if (data?._id) {
                emailProcessor(uniqueCombo)
            }

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

Router.post('/email_verification', (req, res) => {
    try {
        console.log(req.body)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
})

export default Router
