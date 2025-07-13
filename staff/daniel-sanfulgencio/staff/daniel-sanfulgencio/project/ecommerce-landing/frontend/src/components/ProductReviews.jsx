import React, { useEffect, useState } from 'react'
import { getReviewsByProduct, createReview } from '../logic/reviews'
import { getLoggedUserId } from '../logic/helpers/getLoggedUserId'

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  const [text, setText] = useState('')
  const [score, setScore] = useState(5)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = () => {
    getReviewsByProduct(productId)
      .then(setReviews)
      .catch(err => setError(err.message))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createReview({ productId, text, score })
      setText('')
      setScore(5)
      loadReviews()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Opiniones de los usuarios</h3>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 mb-2 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu opinión..."
          required
        />
        <select
          className="p-2 mb-2 text-black"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} estrella{n > 1 && 's'}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Enviar reseña
        </button>
      </form>

      <ul className="space-y-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((r) => (
            <li key={r.id} className="bg-gray-800 p-4 rounded text-white">
              <p className="text-sm text-gray-400">
                Por {r.author?.name || 'Usuario'} - {new Date(r.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold">⭐ {r.score}</p>
              <p>{r.text}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No hay opiniones todavía.</p>
        )}
      </ul>
    </div>
  )
}

export default ProductReviews