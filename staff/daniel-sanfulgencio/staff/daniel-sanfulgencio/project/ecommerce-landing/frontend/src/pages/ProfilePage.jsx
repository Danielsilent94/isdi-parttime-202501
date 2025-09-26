import React, { useEffect, useState } from "react";

export default function ProfilePage({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}`);
        const data = await res.json();
        setProfile(data);
      } catch {
        setError("No se pudo cargar tu perfil.");
      }
    };
    if (user?.id) load();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name || "",
          bio: profile.bio || "",
          avatarUrl: profile.avatarUrl || "",
        }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setProfile(updated);

      // Actualizamos App.jsx también
      setUser({ id: updated._id, name: updated.name });
    } catch {
      setError("No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        Debes iniciar sesión para ver tu perfil.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        Cargando perfil...
      </div>
    );
  }

  // Cargar historial de pedidos
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6 flex items-center gap-4">
          <img
            src={profile.avatarUrl || "https://i.pravatar.cc/100"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{profile.name || "Sin nombre"}</p>
            <p className="text-gray-300 text-sm">{profile.email}</p>
            {profile.bio && (
              <p className="text-gray-400 text-sm mt-1">{profile.bio}</p>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-gray-800 rounded-2xl p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-600/20 border border-red-500 rounded p-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">Nombre</label>
            <input
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Descripción (bio)
            </label>
            <textarea
              className="w-full p-3 rounded bg-gray-700 text-white h-28"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Cuéntanos algo sobre ti…"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Avatar (URL)</label>
            <input
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={profile.avatarUrl || ""}
              onChange={(e) =>
                setProfile({ ...profile, avatarUrl: e.target.value })
              }
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

        {/* Historial de pedidos */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Mis pedidos</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">
              Aún no has realizado ninguna compra.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-800 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Pedido realizado el {order.date}
                  </p>
                  <ul className="space-y-1 mb-2">
                    {order.items.map((item) => (
                      <li key={item._id} className="text-gray-200 text-sm">
                        {item.quantity} x {item.name} ({item.price} €)
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold text-green-400">
                    Total: {order.total.toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}