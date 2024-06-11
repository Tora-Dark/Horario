// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./hooks/AuthProvider.jsx";
import Navigationbar from "./pages/Navbar/Navigationbar.jsx";
import TopNavbar from "./pages/Dashboard/index.jsx";
import Auth from "./pages/Auth/index.jsx";
import Logout from "./pages/Logout/index.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Horario from "./pages/Horario/index.jsx";
import AsignaturaTable from "./pages/Asignaturas/index.jsx";
import BrigadaTable from "./pages/Brigadas/index.jsx";
import LoacalsTable from "./pages/Locals/index.jsx";
import CursosTable from "./pages/Cursos/index.jsx";
import Prueba from "./pages/Prueba/index.jsx";
import Register from "./pages/Auth/components/Register.jsx";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h1>Cargando...</h1>;
  }
  return user ? element : <Navigate to="/Horario/auth" />;
};

export default function App() {
  return (
    <AuthProvider>
      <NextUIProvider>
        <Router>
          <div className="flex flex-col bg-slate-100 h-[100vh]">
            <Navigationbar />
            <div className="flex flex-row h-full">
              <TopNavbar />
              <Routes>
                <Route path="/Horario/auth" element={<Auth />} />
                <Route path="/Horario/register" element={<Register />} />
                <Route path="/Horario/logout" element={<Logout />} />
                <Route path="/Horario/horario" element={<PrivateRoute element={<Horario />} />} />
                <Route path="/Horario/brigadas" element={<PrivateRoute element={<BrigadaTable />} />} />
                <Route path="/Horario/locales" element={<PrivateRoute element={<LoacalsTable />} />} />
                <Route path="/otros" element={<PrivateRoute element={<Prueba />} />} />
                <Route path="/Horario/asignaturas" element={<PrivateRoute element={<AsignaturaTable />} />} />
                <Route path="/cursos" element={<PrivateRoute element={<CursosTable />} />} />
                <Route path="/" element={<Navigate to="/horario" />} />
              </Routes>
            </div>
          </div>
        </Router>
        <ToastContainer />
      </NextUIProvider>
    </AuthProvider>
  );
}
