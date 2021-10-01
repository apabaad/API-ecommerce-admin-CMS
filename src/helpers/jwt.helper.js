import jwt from 'jsonwebtoken'
import { createAccessSession } from '../modals/session/Session.model.js'
import { setRefreshJWT } from '../modals/user/User.modal.js'

export const createAccessJWT = async ({ _id, email }) => {
    const token = jwt.sign({ email }, process.env.JWT_ACCESS_JWT, {
        expiresIn: '15m',
    })

    // store in db
    const obj = {
        type: 'accessJWT',
        userId: _id,
        token,
    }
    const result = await createAccessSession(obj)
    if (result._id) {
        return token
    }

    return false
}
export const createRefreshJWT = async ({ _id, email }) => {
    const token = jwt.sign({ email }, process.env.JWT_REFRESH_JWT, {
        expiresIn: '30d',
    })

    const result = await setRefreshJWT(_id, token)
    if (result._id) {
        return token
    }
    return false
}

export const getJWTs = async (userInfo) => {
    const accessJWT = await createAccessJWT(userInfo)
    const refreshJWT = await createRefreshJWT(userInfo)
    return { accessJWT, refreshJWT }
}
