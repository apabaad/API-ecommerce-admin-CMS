import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            default: 'inactive',
        },

        name: {
            type: String,
            required: true,
            default: '',
            maxLength: 30,
        },
        slug: {
            type: String,
            required: true,
            maxLength: 30,
            unique: true,
            index: 1, //sort either asc or desc
        },
        parentCat: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
    },

    {
        timestamps: true,
    }
)

export default mongoose.model('Category', CategorySchema)
