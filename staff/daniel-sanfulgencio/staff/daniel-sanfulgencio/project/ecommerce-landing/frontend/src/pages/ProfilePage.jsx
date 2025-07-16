import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../logic/getLoggedUser';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLoggedUser());
  }, []);

  if (!user) {
    return (
      <section className="p-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Perfil</h2>
        <p>No has iniciado sesión.</p>
      </section>
    );
  }

  return (
    <section className="p-10 text-white max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h2>
      <div className="flex flex-col items-center">
        <img
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-300 mb-4">ID: {user.id}</p>
      </div>
    </section>
  );
};

export default ProfilePage;