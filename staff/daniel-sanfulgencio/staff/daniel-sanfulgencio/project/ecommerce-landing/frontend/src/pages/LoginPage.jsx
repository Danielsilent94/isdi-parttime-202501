import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    // Aquí iría la llamada al backend real.
    if (email && password) {
      const mockUser = {
        name: 'Usuario Demo',
        email,
        avatar: 'https://i.pravatar.cc/40',
      }
      setUser(mockUser)
      navigate('/')
    }
  }

  return (
    <section className="p-10 text-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="p-2 rounded text-black"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          className="p-2 rounded text-black"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </section>
  )
}

export default LoginPage

