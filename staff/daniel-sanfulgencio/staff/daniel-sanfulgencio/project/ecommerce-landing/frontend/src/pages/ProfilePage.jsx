import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [description, setDescription] = useState(user?.description || '')
  const [avatar, setAvatar] = useState(user?.avatar || 'https://i.pravatar.cc/100')

  const handleSave = () => {
    const updatedUser = { ...user, name, description, avatar }
    setUser(updatedUser)
    navigate('/')
  }

  if (!user) return <p className="text-white p-10">Debes iniciar sesión para ver tu perfil.</p>

  return (
    <section className="p-10 text-white max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>

      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border border-white"
        />
        <input
          type="url"
          placeholder="URL de nueva imagen"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 rounded text-black"
        />
        <textarea
          placeholder="Descripción (ej: apasionado por la tecnología...)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-2 rounded text-black"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full"
      >
        Guardar cambios
      </button>

      <div className="mt-10 text-gray-300">
        <h3 className="text-xl font-semibold mb-2">Historial de compras</h3>
        <p>Aquí se mostrarán tus compras pasadas (en desarrollo).</p>
      </div>
    </section>
  )
}

export default ProfilePage
