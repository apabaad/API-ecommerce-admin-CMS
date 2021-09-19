import ResetPinSchema from './ResetPin.schema.js'

export const createUniqueReset = (userInfo) => {
    return ResetPinSchema(userInfo).save()
}
