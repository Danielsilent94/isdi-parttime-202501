import { apiUrl } from "../helpers/constants";

export default async function getUserById(userId) {
  const res = await fetch(`${apiUrl}/users/${userId}`);
  if (!res.ok) throw new Error("No se pudo cargar el usuario");
  return res.json();
}
