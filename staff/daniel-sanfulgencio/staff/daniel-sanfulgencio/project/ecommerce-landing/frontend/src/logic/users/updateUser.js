import { apiUrl } from "../helpers/constants";

export default async function updateUser(userId, payload) {
  const res = await fetch(`${apiUrl}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo guardar");
  return res.json();
}