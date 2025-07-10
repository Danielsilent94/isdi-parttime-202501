const mongoose = require('mongoose')
const app = require('./app.js')
require('dotenv').config()

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce'

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB conectado')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch(err => console.error('❌ Error de conexión MongoDB:', err))
