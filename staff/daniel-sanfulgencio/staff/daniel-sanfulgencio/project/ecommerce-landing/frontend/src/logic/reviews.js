import { apiUrl } from './helpers/constants'
import { getAuthHeaders } from './helpers/getAuthHeaders'

export const getReviewsByProduct = async (productId) => {
  const res = await fetch(`${apiUrl}/reviews/product/${productId}`)
  if (!res.ok) throw new Error('Error al cargar reviews')
  return res.json()
}

export const createReview = async ({ productId, text, score }) => {
  const res = await fetch(`${apiUrl}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ productId, text, score })
  })
  if (!res.ok) throw new Error('Error al enviar review')
  return res.json()
}
