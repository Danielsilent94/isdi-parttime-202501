import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      amount: {
        type: Number,
        default: 1
      }
    }
  ]
}, { timestamps: true })

export default model('User', userSchema)
