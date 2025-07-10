const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const reviewRoutes = require('./routes/reviewRoutes.js')
const { errorHandler } = require('./middlewares/errorHandler.js')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

app.use(errorHandler)

module.exports = app
