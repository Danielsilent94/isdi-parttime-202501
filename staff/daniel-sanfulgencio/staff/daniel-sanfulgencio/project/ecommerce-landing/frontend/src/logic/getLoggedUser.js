export function getLoggedUser() {
  const id = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');
  if (!id) return null;
  return { id, name };
}