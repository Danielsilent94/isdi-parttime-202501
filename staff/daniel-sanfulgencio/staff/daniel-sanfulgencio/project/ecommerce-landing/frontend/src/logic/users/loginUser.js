export default async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al iniciar sesión");
    }

    const data = await response.json();

    // Guardamos en localStorage los datos necesarios
    localStorage.setItem("userId", data.user._id);
    localStorage.setItem("userName", data.user.name);

    // 🔑 Guardamos también el token para reseñas y rutas protegidas
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}