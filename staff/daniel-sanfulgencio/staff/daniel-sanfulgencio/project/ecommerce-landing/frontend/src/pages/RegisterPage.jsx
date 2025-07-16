import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../logic/users/registerUser';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="p-10 text-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Crear cuenta</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 rounded text-black"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;