import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, { timestamps: true })

export default model('Review', reviewSchema)
