import Product from '../models/product.js'

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body

  try {
    const newProduct = await Product.create({ name, description, price })
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('reviews')
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ message: 'Producto eliminado' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' })
  }
}
