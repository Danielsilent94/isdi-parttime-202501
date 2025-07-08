import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/ecommerce-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

after(async () => {
  await mongoose.connection.close()
})
