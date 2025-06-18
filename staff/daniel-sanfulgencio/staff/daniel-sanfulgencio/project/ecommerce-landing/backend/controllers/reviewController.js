import Review from '../models/review.js'
import Product from '../models/product.js'
import Review from '../models/review.js'


export const createReview = async (req, res) => {
  try {
    const { text, score, productId } = req.body
    const author = req.userId // Asegúrate de tener el usuario autenticado

    const review = await Review.create({ text, score, product: productId, author })

    // Añadir review al producto
    await Product.findByIdAndUpdate(productId, { $push: { reviews: review._id } })

    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const reviews = await Review.find({ product: productId }).populate('author', 'name')
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
