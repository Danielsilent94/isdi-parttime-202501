import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce'

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server on port ${PORT}`))
  })
  .catch(err => console.error('MongoDB connection error:', err))




