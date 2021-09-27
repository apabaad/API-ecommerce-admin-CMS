import CategorySchema from './Category.Schema.js'

export const createCategory = (newCat) => {
    return CategorySchema(newCat).save()
}
