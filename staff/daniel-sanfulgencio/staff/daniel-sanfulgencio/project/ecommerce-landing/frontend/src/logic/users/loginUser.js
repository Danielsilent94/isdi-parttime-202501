import { apiUrl } from '../helpers/constants';

export async function loginUser(email, password) {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Error al iniciar sesión');
  const data = await res.json();

  localStorage.setItem('userId', data._id);
  localStorage.setItem('userName', data.name);
  return data;
}