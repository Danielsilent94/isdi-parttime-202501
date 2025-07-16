import { apiUrl } from '../helpers/constants';

export async function registerUser(name, email, password) {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) throw new Error('Error en el registro');
  const data = await res.json();

  localStorage.setItem('userId', data._id);
  localStorage.setItem('userName', data.name);
  return data;
}