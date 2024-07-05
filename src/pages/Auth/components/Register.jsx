
// src/pages/Register/index.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation });
      navigate('/horario');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className=" flex w-full  place-content-center items-center justify-items-center ">
      <div className=" ">

      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <Input  variant="underlined"
          type="text"
           isRequired label="Nombre" placeholder="Introduzca su Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 rounded w-full"
        />
        <Input  variant="underlined"
          type="email"
           isRequired label="Correo" placeholder="Introduzca su Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 rounded w-full"
        />
        <Input  variant="underlined"
          type="password"
           isRequired label="Contraseña" placeholder="Introduzca su Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 rounded w-full"
        />
        <Input  variant="underlined"
          type="password"
           isRequired label="Confirmar Contraseña" placeholder="Confirme su Contraseña"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="mb-4 p-2 rounded w-full"
        />
         <p className="text-center mb-4 text-small">
               Ya tiene una cuenta?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                   Iniciar Sesion
                  </Link>
                </p>
        <Button type="submit" color='primary' variant='shadow' className="p-2 rounded w-full">
          Register
        </Button>
      </form>
    </div>
    </div>
  );
};

export default Register;
