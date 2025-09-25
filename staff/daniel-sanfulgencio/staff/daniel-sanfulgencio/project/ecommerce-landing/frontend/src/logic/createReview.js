export default async function createReview(productId, comment, rating) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No estás autenticado.");
    }

    const response = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔑 enviamos el token JWT
      },
      body: JSON.stringify({ productId, comment, rating }), // 👈 userId NO es necesario
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear reseña");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en createReview:", error);
    throw error;
  }
}