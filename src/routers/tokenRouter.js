import express from 'express'
const Router = express.Router()

import { createAccessJWT, verifyRefreshJWT } from '../helpers/jwt.helper.js'
import { getUser } from '../modals/user/User.modal.js'

Router.get('/', async (req, res) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const decoded = verifyRefreshJWT(authorization)
            console.log(decoded)

            if (decoded?.email) {
                const user = await getUser({
                    email: decoded.email,
                    refreshJWT: authorization,
                })
                if (user?._id) {
                    // create new accessToken

                    const accessJWT = await createAccessJWT({
                        _id: user._id,
                        email: user.email,
                    })
                    return res.json({
                        state: 'sucess',
                        message: 'New access token has been generated',
                        accessJWT,
                    })
                }
            }
        }
        res.status(401).json({
            state: 'error',
            message: 'Invalid token',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
    }
})

export default Router
