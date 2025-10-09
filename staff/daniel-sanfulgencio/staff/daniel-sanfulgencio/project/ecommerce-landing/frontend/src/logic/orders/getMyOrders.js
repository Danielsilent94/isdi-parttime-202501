export default async function getMyOrders(userId, token) {
  if (!userId || !token) throw new Error("Faltan credenciales");

  const response = await fetch(`http://localhost:3000/api/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener pedidos");
  }

  return response.json();
}