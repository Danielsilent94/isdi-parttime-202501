import React, { useEffect, useState } from "react";
import getUserById from "../logic/users/getUserById";
import updateUser from "../logic/users/updateUser";
import getMyOrders from "../logic/orders/getMyOrders";

export default function ProfilePage({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const [u, o] = await Promise.all([
          getUserById(user.id),
          getMyOrders(user.id, token),
        ]);
        setProfile(u);
        setOrders(Array.isArray(o) ? o : []);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar tu perfil o tus pedidos.");
      }
    };
    if (user?.id) loadAll();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const updated = await updateUser(user.id, {
        name: profile.name || "",
        bio: profile.bio || "",
        avatarUrl: profile.avatarUrl || "",
      });
      setProfile(updated);
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

        <form onSubmit={handleSave} className="bg-gray-800 rounded-2xl p-6 space-y-4">
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
            <label className="block text-sm text-gray-300 mb-1">Descripción (bio)</label>
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

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Historial de pedidos</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No has realizado pedidos aún.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("es-ES")}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-gray-200 text-sm">
                        {item.product?.name || "Producto eliminado"} x {item.quantity} ={" "}
                        {(item.price * item.quantity).toFixed(2)} €
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold text-green-400 mt-2">
                    Total: {order.total.toFixed(2)} €
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}