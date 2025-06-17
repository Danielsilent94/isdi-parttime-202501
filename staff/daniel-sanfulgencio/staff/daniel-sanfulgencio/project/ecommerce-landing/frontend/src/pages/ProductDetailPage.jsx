import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  const [text, setText] = useState('')
  const [score, setScore] = useState(5)
  const [reviewError, setReviewError] = useState(null)

  const fetchProduct = () => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(() => setError('Error al cargar el producto'))
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:4000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, score, productId: id })
      })

      if (!res.ok) throw new Error('Error al enviar review')

      setText('')
      setScore(5)
      setReviewError(null)
      fetchProduct()
    } catch (err) {
      setReviewError(err.message)
    }
  }

  if (error) return <p className="text-red-400 p-10">{error}</p>
  if (!product) return <p className="text-white p-10">Cargando...</p>

  return (
    <section className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

      <h2 className="text-xl font-bold mt-10 mb-2">Reviews</h2>
      <ul className="space-y-2 mb-6">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, idx) => (
            <li key={idx} className="bg-gray-800 p-3 rounded">
              <p className="text-sm italic">Puntuación: {review.score}/5</p>
              <p>{review.text}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400">Este producto aún no tiene reviews.</p>
        )}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Añadir review</h3>

      {reviewError && <p className="text-red-400 mb-2">{reviewError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe tu opinión"
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
          Enviar review
        </button>
      </form>
    </section>
  )
}

export default ProductDetailPage
