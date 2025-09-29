import { apiUrl } from "../helpers/constants";

export default async function getMyOrders(userId, token) {
  const res = await fetch(`${apiUrl}/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("No se pudieron cargar los pedidos");
  return res.json();
}