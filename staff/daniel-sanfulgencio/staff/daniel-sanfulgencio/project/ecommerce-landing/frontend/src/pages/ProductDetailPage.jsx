import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailPage = ({ cart, setCart }) => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  const [text, setText] = useState('')
  const [score, setScore] = useState(5)
  const [reviewError, setReviewError] = useState(null)

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`)
      if (!res.ok) throw new Error('Error al cargar el producto')
      const data = await res.json()
      setProduct(data)
    } catch (err) {
      setError('Error al cargar el producto')
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, score, productId: id }),
      })

      if (!res.ok) throw new Error('Error al enviar la review')

      setText('')
      setScore(5)
      setReviewError(null)
      fetchProduct()
    } catch (err) {
      setReviewError(err.message)
    }
  }

  const addToCart = () => {
    const exists = cart.find(item => item.id === product.id)
    if (exists) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  if (error) return <p className="text-red-400 p-10">{error}</p>
  if (!product) return <p className="text-white p-10">Cargando...</p>

  return (
    <section className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

      <button
        onClick={addToCart}
        className="bg-blue-600 px-4 py-2 mb-6 rounded hover:bg-blue-700"
      >
        Añadir al carrito
      </button>

      <h2 className="text-xl font-bold mt-10 mb-2">Reseñas</h2>
      <ul className="space-y-2 mb-6">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, idx) => (
            <li key={review.id || idx} className="bg-gray-800 p-3 rounded">
              <p className="text-sm italic">
                Puntuación: {review.score}/5 — <span className="text-green-300">{review.author?.name || 'Anónimo'}</span>
              </p>
              <p>{review.text}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400">Este producto aún no tiene reseñas.</p>
        )}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Escribe una reseña</h3>
      {reviewError && <p className="text-red-400 mb-2">{reviewError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Tu opinión sobre el producto..."
          required
          className="w-full p-2 text-black rounded"
        />
        <select
          value={score}
          onChange={e => setScore(Number(e.target.value))}
          className="w-full p-2 text-black rounded"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>
        <button className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">
          Enviar reseña
        </button>
      </form>
    </section>
  )
}

export default ProductDetailPage