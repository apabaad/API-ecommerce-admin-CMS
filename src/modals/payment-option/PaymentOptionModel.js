import PaymentOptionSchema from './PaymentOptionSchema.js'

export const createPaymentOption = (Obj) => {
    return PaymentOptionSchema(Obj).save()
}

export const getAPaymentOption = (_id) => {
    return PaymentOptionSchema.findById(_id)
}
export const getPaymentOptions = () => {
    return PaymentOptionSchema.find()
}
export const deletePaymentOption = (_id) => {
    return PaymentOptionSchema.findByIdAndDelete(_id)
}
