import { verifyAccessJWT } from '../helpers/jwt.helper.js'
import { getSession } from '../modals/session/Session.model.js'
import { getUserById } from '../modals/user/User.modal.js'
export const isAdminAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const decoded = verifyAccessJWT(authorization)
            console.log(decoded)

            if (decoded === 'jwt expired') {
                return res.status(403).json({
                    status: 'error',
                    message: 'jwt expired',
                })
            }
            if (decoded?.email) {
                // is token in session db
                const session = await getSession({ token: authorization })
                if (session?._id) {
                    const user = await getUserById(session.userId)
                    if (user?.role === 'admin') {
                        req.user = user //adding new property 'user' to req object
                        return next()
                    }
                }
            }
        }
        return res.status(403).json({
            status: 'error',
            message: 'Unauthenticated',
        })
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
    }
}
