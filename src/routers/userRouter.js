import express from 'express'
const Router = express.Router()

import {
    activeUser,
    createUser,
    getUserByEmail,
} from '../modals/user/User.modal.js'
import {
    createUniqueReset,
    deleteUniqueReset,
    findUniqueReset,
} from '../modals/reset-pin/ResetPin.modal.js'
import {
    newUserFormValidation,
    emailVerificationValidation,
    adminLoginValidation,
} from '../middlewares/validation.middleware.js'
import { hashPassword, verifyPassword } from '../helpers/bcrypt.helper.js'
import { getRandomOTP } from '../helpers/otp.helper.js'
import {
    emailProcessor,
    emailVerificationWelcome,
} from '../helpers/mail.helper.js'

import { getJWTs } from '../helpers/jwt.helper.js'

import { isAdminAuth } from '../middlewares/auth.middleware.js'

Router.get('/', isAdminAuth, (req, res) => {
    try {
        const user = req.user
        user.refreshJWT = undefined
        user.password = undefined
        res.json({
            status: 'success',
            message: 'user profile fetched',
            user,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        })
    }
})

Router.post('/', newUserFormValidation, async (req, res) => {
    try {
        // hash password
        // const t1 = Date.now()
        const hashPass = hashPassword(req.body.password)
        // const t2 = Date.now()
        // console.log(hashPass, 'time taken = ' + (t2 - t1) + 'ms')

        req.body.password = hashPass
        const result = await createUser(req.body)
        // console.log('result', result)
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
                status: 'success',
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

Router.post(
    '/email-verification',
    emailVerificationValidation,
    async (req, res) => {
        try {
            //check if pin and email combo exist in reset pin db
            const result = await findUniqueReset(res.body)
            if (result?._id) {
                const isUserActive = await activeUser(req.body.email)
                if (isUserActive?._id) {
                    emailVerificationWelcome(req.body.email)

                    // delete the reset pin data
                    deleteUniqueReset(req.body)
                    return res.json({
                        status: 'success',
                        message: 'email verified, sign in now',
                    })
                }
            }
            //if yes, then update user status to active
            res.json({
                status: 'error',
                message: 'Invalid or expired link',
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: 'error',
                message: 'error, unable to process. try later',
            })
        }
    }
)

// login
Router.post('/login', adminLoginValidation, async (req, res) => {
    try {
        const { email, password } = req.body
        // 1. find user by email

        const user = await getUserByEmail(email)
        if (user?._id) {
            const isPassMatched = verifyPassword(password, user.password)

            if (isPassMatched) {
                user.password = undefined //not sending user "password" to the frontend

                const tokens = await getJWTs({ _id: user._id, email })
                return res.json({
                    status: 'success',
                    message: 'logged in',
                    user,
                    tokens,
                })
            }
        }

        res.json({
            status: 'error',
            message: 'Invalid login',
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: 'error, unable to process',
        })
    }
})

export default Router
