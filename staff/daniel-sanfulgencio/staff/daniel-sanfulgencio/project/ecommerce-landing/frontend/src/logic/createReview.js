import getToken from './getToken'

export async function createReview({ text, score, productId }) {
  const token = getToken()
  const res = await fetch('http://localhost:4000/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text, score, productId })
  })
  if (!res.ok) throw new Error('Error al crear review')
  return await res.json()
}
