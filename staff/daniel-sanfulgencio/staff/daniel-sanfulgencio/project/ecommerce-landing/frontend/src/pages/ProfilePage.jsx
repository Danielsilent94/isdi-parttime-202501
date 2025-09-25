import React from "react";
import getLoggedUser from "../logic/getLoggedUser";
import updateUser from "../logic/updateUser"; // ✅ está en logic, no en logic/users
import deleteUser from "../logic/deleteUser"; // ✅ también en logic
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = getLoggedUser();

  const [name, setName] = useState(user?.name || "");
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const updated = await updateUser(user.id, { name, description }, token);
    if (updated) {
      alert("Perfil actualizado");
      localStorage.setItem("userName", name);
    } else {
      alert("Error al actualizar");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (confirmed) {
      const deleted = await deleteUser(user.id, token);
      if (deleted) {
        localStorage.clear();
        onLogout();
        navigate("/register");
      } else {
        alert("Error al eliminar cuenta");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <div className="mb-4">
        <label className="block mb-1">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 w-full"
        ></textarea>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;