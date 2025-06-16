import Review from '../models/review.js'
import Product from '../models/product.js'

export const createReview = async (req, res) => {
  const { text, score, author, product } = req.body

  try {
    const newReview = await Review.create({ text, score, author, product })

    // Asociar review al producto
    await Product.findByIdAndUpdate(product, {
      $push: { reviews: newReview._id }
    })

    res.status(201).json(newReview)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear review' })
  }
}

export const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const reviews = await Review.find({ product: productId }).populate('author', 'name')
    res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reviews' })
  }
}
