import express from 'express'
import helmet from 'helmet' // prevent attacks to our server
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 8000

// middleware

app.use(helmet())
app.use(cors())
app.use(morgan())

app.use('/', (req, res) => {
    res.send('You have reached the end of router list')
})

app.listen(PORT, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log(`Server is running at http://localhost:${PORT}`)
})
