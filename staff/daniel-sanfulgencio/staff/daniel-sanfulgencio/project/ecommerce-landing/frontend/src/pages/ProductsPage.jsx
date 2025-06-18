import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../logic/getAllProducts'

const ProductsPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(err => setError(err.message))
  }, [])

  const addToCart = product => {
    const exists = cart.find(item => item._id === product._id)
    if (exists) {
      setCart(
        cart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleFilter = category => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter(
          p => p.category?.toLowerCase() === category.toLowerCase()
        )
      )
    }
  }

  const categories = ['all', 'laptops', 'smartphones', 'accessories', 'headphones']

  return (
    <section className="p-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Todos los productos</h2>

      {error && <p className="text-red-400">{error}</p>}

      {/* Filtro por categoría */}
      <div className="mb-6 flex gap-4 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            } capitalize`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="bg-white text-black p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="mb-2">{product.description}</p>
            <p className="font-bold mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
