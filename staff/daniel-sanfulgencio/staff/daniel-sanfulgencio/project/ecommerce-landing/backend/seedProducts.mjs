import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.mjs'

dotenv.config()

const products = [
  {
    name: 'MacBook Pro M2',
    description: 'Laptop profesional de Apple con chip M2',
    price: 1999.99,
    category: 'laptops'
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Smartphone de última generación de Samsung',
    price: 899.99,
    category: 'smartphones'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Auriculares con cancelación de ruido',
    price: 349.99,
    category: 'headphones'
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Ratón ergonómico para productividad',
    price: 99.99,
    category: 'accessories'
  }
]

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('🔗 MongoDB conectado')

  await Product.deleteMany({})
  await Product.insertMany(products)

  console.log('✅ Productos insertados correctamente')
  process.exit()
}).catch(err => {
  console.error('❌ Error al conectar a MongoDB', err)
  process.exit(1)
})