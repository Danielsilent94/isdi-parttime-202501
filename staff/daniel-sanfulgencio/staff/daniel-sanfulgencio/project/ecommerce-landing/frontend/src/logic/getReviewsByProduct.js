export async function getReviewsByProduct(productId) {
  const res = await fetch(`http://localhost:4000/api/reviews/${productId}`)
  if (!res.ok) throw new Error('No se pudieron cargar las reviews')
  return await res.json()
}
