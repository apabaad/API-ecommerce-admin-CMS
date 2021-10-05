import UserSchema from './User.Schema.js'

export const createUser = (newUser) => {
    try {
        const result = UserSchema(newUser).save()
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const activeUser = (email) => {
    return UserSchema.findOneAndUpdate(
        { email: email },
        { status: 'active', isEmailConfirm: true },
        { new: true }
    )
}

export const getUserByEmail = (email) => {
    return UserSchema.findOne({ email })
}
export const getUserById = (_id) => {
    return UserSchema.findOne({ _id })
}

export const setRefreshJWT = (_id, refreshJWT) => {
    return UserSchema.findByIdAndUpdate(_id, {
        refreshJWT,
    })
}

export const getUser = (filter) => {
    return UserSchema.findOne({ filter })
}
