export default function getLoggedUser() {
  const id = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');

  if (!id || !name) return null;

  return { id, name };
}