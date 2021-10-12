import ProductSChema from './Product.schema.js'

export const createProduct = (prodInfo) => {
    return ProductSChema(prodInfo).save()
}
export const getProducts = () => {
    return ProductSChema.find()
}
export const getSingleProduct = (filter) => {
    return ProductSChema.findOne(filter)
}
export const getSingleProductByID = (_id) => {
    return ProductSChema.findById(_id)
}
export const updateProduct = (filter, obj) => {
    return ProductSChema.findOneAndUpdate(filter, obj)
}
export const updateProductById = (_id, obj) => {
    return ProductSChema.findByIdAndUpdate(_id, obj)
}
export const deleteProductById = (_id) => {
    return _id ? ProductSChema.findByIdAndDelete(_id) : null
}
