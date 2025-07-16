import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../logic/users/loginUser';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userData = await loginUser(email, password);
      setUser({ id: userData.userId, name: userData.name });
      navigate('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="p-10 text-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Iniciar sesión</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 rounded text-black"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};

export default LoginPage;