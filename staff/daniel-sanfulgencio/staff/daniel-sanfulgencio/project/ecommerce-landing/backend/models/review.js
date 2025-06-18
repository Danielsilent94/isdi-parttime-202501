import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now }
})

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)

export default Review
