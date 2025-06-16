export const getAllProducts = async () => {
  const res = await fetch('http://localhost:4000/api/products')
  if (!res.ok) throw new Error('No se pudo cargar productos')
  return await res.json()
}
