import { apiUrl } from './helpers/constants';

// Registrar usuario
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}

// Login usuario
export async function loginUser({ email, password }) {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Credenciales incorrectas');
  return res.json();
}

// Obtener usuario por ID
export async function getUserById(id) {
  const res = await fetch(`${apiUrl}/users/${id}`);
  if (!res.ok) throw new Error('Error al obtener usuario');
  return res.json();
}

// Actualizar usuario por ID
export async function updateUser(id, data) {
  const res = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return res.json();
}