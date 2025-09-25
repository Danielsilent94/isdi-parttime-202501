import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../logic/users/registerUser";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(name, email, password); // guarda userId/userName si quieres mantenerlo así
      // tras registrarse, ve a login (así evitas el 400 por reintentar el mismo email)
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        {error && (
          <div className="mb-4 text-sm bg-red-600/20 border border-red-500 rounded p-2">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre"
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-6 p-3 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-green-600 hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;