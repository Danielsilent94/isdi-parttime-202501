export default async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) throw new Error("Error al obtener productos");

    return await response.json();
  } catch (error) {
    console.error("❌ Fetch products error:", error);
    return [];
  }
}