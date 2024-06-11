// src/pages/Logout/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('Horario/auth');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default Logout;
