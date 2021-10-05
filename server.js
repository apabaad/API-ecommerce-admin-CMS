import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

import helmet from 'helmet' // prevent attacks to our server
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 8000

// middleware

app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

app.use(express.urlencoded())
app.use(express.json())

//connect the mongodb
import mongoClient from './src/config/db.js'
mongoClient()

//load routers
import userRouter from './src/routers/userRouter.js'
import categoryRouter from './src/routers/categoryRouter.js'
import tokenRouter from './src/routers/tokenRouter.js'

import { isAdminAuth } from './src/middlewares/auth.middleware.js'
// user routers
app.use('/api/v1/user', userRouter)

// category router
app.use('/api/v1/category', isAdminAuth, categoryRouter)
app.use('/api/v1/token', tokenRouter)

app.use('/', (req, res) => {
    res.send('You have reached the end of router list')
})

app.listen(PORT, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log(`Server is running at http://localhost:${PORT}`)
})
