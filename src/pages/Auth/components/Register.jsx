// src/pages/Register/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthProvider';
import { Button } from "@nextui-org/react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      // Manejar caso de contraseñas no coincidentes
      return;
    }
    // Aquí podrías agregar más validaciones antes de enviar los datos al servidor
    register({ email, password });
    navigate('/Horario/horario'); // Redirigir después del registro exitoso
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl">Register</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <Button type="submit" color='primary' variant='shadow' className="p-2 rounded w-full">Register</Button>
      </form>
    </div>
  );
};

export default Register;
