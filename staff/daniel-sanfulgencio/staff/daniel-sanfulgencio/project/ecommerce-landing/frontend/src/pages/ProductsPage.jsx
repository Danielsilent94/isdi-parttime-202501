import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../logic/getAllProducts'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section className="p-10 text-white">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white text-black p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="mb-2">{product.description}</p>
            <p className="font-bold mb-4">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product._id}`}>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Reviews
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage


