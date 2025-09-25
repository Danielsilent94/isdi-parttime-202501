export default async function updateUser(userId, updatedData) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No estás autenticado.');
  }

  const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al actualizar el usuario.');
  }

  return await res.json();
}