import Review from '../models/review.js'
import Product from '../models/product.js'

export const createReview = async (req, res) => {
  const { text, score, productId } = req.body

  try {
    const review = await Review.create({ text, score, product: productId })

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id }
    })

    res.status(201).json(review)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear review' })
  }
}
