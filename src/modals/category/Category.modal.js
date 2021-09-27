import CategorySchema from './Category.Schema.js'

export const createCategory = (newCat) => {
    return CategorySchema(newCat).save()
}
export const getCategory = () => {
    return CategorySchema.find()
}

export const deleteCategory = (_id) => {
    return CategorySchema.findByIdAndDelete(_id)
}
