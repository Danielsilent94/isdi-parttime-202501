import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch {
        setError("No se pudo cargar tu perfil.");
      }
    };
    if (userId) load();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name || "",
          bio: user.bio || "",
          avatarUrl: user.avatarUrl || "",
        }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(updated);
      localStorage.setItem("userName", updated.name || "");
    } catch {
      setError("No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        Debes iniciar sesión para ver tu perfil.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6 flex items-center gap-4">
          <img
            src={user.avatarUrl || "https://i.pravatar.cc/100"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{user.name || "Sin nombre"}</p>
            <p className="text-gray-300 text-sm">{user.email}</p>
            {user.bio && <p className="text-gray-400 text-sm mt-1">{user.bio}</p>}
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-gray-800 rounded-2xl p-6 space-y-4">
          {error && <div className="bg-red-600/20 border border-red-500 rounded p-2">{error}</div>}

          <div>
            <label className="block text-sm text-gray-300 mb-1">Nombre</label>
            <input
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Descripción (bio)</label>
            <textarea
              className="w-full p-3 rounded bg-gray-700 text-white h-28"
              value={user.bio || ""}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              placeholder="Cuéntanos algo sobre ti…"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Avatar (URL)</label>
            <input
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={user.avatarUrl || ""}
              onChange={(e) => setUser({ ...user, avatarUrl: e.target.value })}
              placeholder="https://imagen-tu-avatar..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-medium disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}