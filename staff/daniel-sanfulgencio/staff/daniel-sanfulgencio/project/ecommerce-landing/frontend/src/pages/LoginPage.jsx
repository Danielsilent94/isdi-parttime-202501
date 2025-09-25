import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../logic/users/loginUser";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password); // guarda userId y userName en localStorage
      // Si el padre pasó un callback, lo llamamos; si no, no pasa nada (y no peta)
      if (typeof onLogin === "function") {
        onLogin({ userId: data.user._id, userName: data.user.name });
      }
      navigate("/"); // o a /products si prefieres
    } catch (err) {
      setError(err?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {error && (
          <div className="mb-4 text-sm bg-red-600/20 border border-red-500 rounded p-2">
            {error}
          </div>
        )}

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
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;