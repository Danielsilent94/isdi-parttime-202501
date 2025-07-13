import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Review', ReviewSchema)