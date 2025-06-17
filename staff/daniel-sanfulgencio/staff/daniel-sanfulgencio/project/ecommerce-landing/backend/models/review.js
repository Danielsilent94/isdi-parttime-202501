import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema)
export default Review

