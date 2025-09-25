export default async function registerUser(name, email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await response.json();

    // Guardamos en localStorage
    localStorage.setItem("userId", data.user._id);
    localStorage.setItem("userName", data.user.name);

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}