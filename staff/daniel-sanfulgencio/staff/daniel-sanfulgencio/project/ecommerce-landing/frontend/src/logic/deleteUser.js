export default async function deleteUser(userId) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No estás autenticado.');
  }

  const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al eliminar la cuenta.');
  }

  return await res.json();
}