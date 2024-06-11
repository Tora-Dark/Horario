// src/hooks/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("auth");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const register = (userData) => {
    // Aquí puedes implementar la lógica para registrar un nuevo usuario
    // Por ejemplo, puedes enviar los datos al servidor para crear una nueva cuenta
    // Una vez que el usuario se registre con éxito, puedes llamar a la función `login` para iniciar sesión automáticamente
    login(userData); // Esto es un ejemplo, asegúrate de ajustarlo según tus necesidades
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login,register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
