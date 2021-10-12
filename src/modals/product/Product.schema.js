import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
        require: true,
    },
    title: {
        type: String,
        maxLength: 100,
        default: false,
        require: true,
    },
    slug: {
        type: String,
        maxLength: 120,
        require: true,
        unique: true,
        index: 1,
        default: '',
    },
    price: {
        type: Number,
        max: 10000,
        require: true,
    },
    qty: {
        type: Number,
        max: 10000,
        require: true,
    },
    brand: {
        type: String,
        max: 30,
        default: '',
        require: true,
    },
    description: {
        type: String,
        max: 3000,
        default: '',
    },
    categories: {
        type: Array,
        default: null,
    },
    salePrice: {
        type: Number,
        max: 10000,
        default: 0,
    },
    salesStartDate: {
        type: Date,
    },
    saleEndDate: {
        type: Date,
    },
    images: {
        type: Array,
        default: null,
    },
})

export default mongoose.model('Product', ProductSchema)
