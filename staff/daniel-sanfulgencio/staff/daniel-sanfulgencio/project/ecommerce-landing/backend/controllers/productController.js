import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body

    const product = new Product({
      name,
      description,
      price,
      category: category.toLowerCase() // forzamos minúsculas
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error })
  }
}

