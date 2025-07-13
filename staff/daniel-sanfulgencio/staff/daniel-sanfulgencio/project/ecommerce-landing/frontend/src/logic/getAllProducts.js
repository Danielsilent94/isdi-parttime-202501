import { apiUrl } from './helpers/constants';

export const getAllProducts = async () => {
  const res = await fetch(`${apiUrl}/products`);
  if (!res.ok) throw new Error('No se pudo cargar productos');
  return await res.json();
};