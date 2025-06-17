import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import productRoutes from './routes/productRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/users', userRoutes)

// Conexión y arranque del servidor
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce'
const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })




