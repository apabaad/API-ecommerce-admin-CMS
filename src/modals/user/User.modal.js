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
