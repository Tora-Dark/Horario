import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
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
const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate("/horario");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className=" flex w-full  place-content-center items-center justify-items-center ">
      <div className=" ">

      <form className="bg-white flex flex-col items-center p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl">          Iniciar sesión</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <Input
         isRequired label="Correo" placeholder="Introduzca su Correo" type="email"
         value={email}
         variant="underlined"
         onChange={(e) => setEmail(e.target.value)}
         className="mb-4 p-2  rounded w-full"
         />
        <Input
          isRequired
          label="Contraseña"
          placeholder="Introduzca su Contraseña"
          type="password"
          value={password}
           variant="underlined"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 rounded w-full"
        />
          <p className="text-center mb-4 text-small">
                Necesita crear una cuenta?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                   Registrarse
                  </Link>
                </p>
        <Button
          type="submit"
          color="primary"
          variant="shadow"
          className="p-2 rounded w-full"
          >
          Iniciar sesión
        </Button>
      </form>
          </div>
    </div>
  );
};

export default Auth;
