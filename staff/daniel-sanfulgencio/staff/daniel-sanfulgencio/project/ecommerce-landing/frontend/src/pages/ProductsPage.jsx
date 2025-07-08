import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../logic/getAllProducts'
import { getReviewsByProduct } from '../logic/getReviewsByProduct'
import { createReview } from '../logic/createReview'
import getLoggedUserId from '../logic/getLoggedUserId'

const ProductsPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [reviewsVisible, setReviewsVisible] = useState({})
  const [reviews, setReviews] = useState({})
  const [newReview, setNewReview] = useState({})
  const userId = getLoggedUserId()

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

  const toggleReviews = async productId => {
    if (reviewsVisible[productId]) {
      setReviewsVisible(prev => ({ ...prev, [productId]: false }))
    } else {
      const data = await getReviewsByProduct(productId)
      setReviews(prev => ({ ...prev, [productId]: data }))
      setReviewsVisible(prev => ({ ...prev, [productId]: true }))
    }
  }

  const handleReviewSubmit = async (e, productId) => {
    e.preventDefault()
    if (!newReview[productId]?.text || !newReview[productId]?.score) return
    await createReview({
      text: newReview[productId].text,
      score: Number(newReview[productId].score),
      productId
    })
    const updated = await getReviewsByProduct(productId)
    setReviews(prev => ({ ...prev, [productId]: updated }))
    setNewReview(prev => ({ ...prev, [productId]: { text: '', score: '' } }))
  }

  const categories = ['all', 'laptops', 'smartphones', 'accessories', 'headphones']

  return (
    <section className="p-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Todos los productos</h2>
      {error && <p className="text-red-400">{error}</p>}

      {/* Categorías */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Añadir al carrito
            </button>

            <button
              onClick={() => toggleReviews(product._id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {reviewsVisible[product._id] ? 'Ocultar reviews' : 'Ver reviews'}
            </button>

            {reviewsVisible[product._id] && (
              <div className="mt-4 bg-gray-100 p-2 rounded">
                <h4 className="font-bold mb-2">Opiniones:</h4>
                {reviews[product._id]?.length ? (
                  reviews[product._id].map(r => (
                    <div key={r._id} className="mb-2">
                      <p className="text-sm">
                        <strong>{r.author?.name || 'Anónimo'}:</strong> {r.text} ({r.score}/5)
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No hay opiniones.</p>
                )}

                {userId && (
                  <form onSubmit={e => handleReviewSubmit(e, product._id)} className="mt-2">
                    <textarea
                      placeholder="Tu opinión..."
                      value={newReview[product._id]?.text || ''}
                      onChange={e =>
                        setNewReview(prev => ({
                          ...prev,
                          [product._id]: {
                            ...prev[product._id],
                            text: e.target.value
                          }
                        }))
                      }
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Puntuación (1-5)"
                      value={newReview[product._id]?.score || ''}
                      onChange={e =>
                        setNewReview(prev => ({
                          ...prev,
                          [product._id]: {
                            ...prev[product._id],
                            score: e.target.value
                          }
                        }))
                      }
                      className="w-full p-2 mb-2 border rounded"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
                    >
                      Enviar review
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
