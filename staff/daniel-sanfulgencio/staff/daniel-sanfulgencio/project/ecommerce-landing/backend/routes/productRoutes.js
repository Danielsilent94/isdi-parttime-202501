import express from 'express'
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById
} from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.delete('/:id', deleteProduct)

export default router
