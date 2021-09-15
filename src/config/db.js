import mongoose from 'mongoose'

const mongoClient = async () => {
    try {
        // const mongoUrl = "mongodb://localhost:27017/a_task_list";
        const mongoUrl = process.env.MONGO_CLIENT
        if (!mongoUrl) {
            return console.log(
                'Please add mongoDB connection in env variable MONGO_CLIENT'
            )
        }

        const con = await mongoose.connect(mongoUrl)

        if (con) {
            console.log('mongodb connected')
        }
    } catch (error) {
        console.log(error)
    }
}

export default mongoClient
