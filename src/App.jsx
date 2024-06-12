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
import Register from "./pages/Auth/components/Register.jsx";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h1>Cargando...</h1>;
  }
  return user ? element : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <AuthProvider>
      <NextUIProvider>
      {/*   <Router basename="/Horario"> */}
          <div className="flex flex-col bg-slate-100 h-[100vh]">
            <Navigationbar />
            <div className="flex flex-row h-full">
              <TopNavbar />
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/horario" element={<PrivateRoute element={<Horario />} />} />
                <Route path="/brigadas" element={<PrivateRoute element={<BrigadaTable />} />} />
                <Route path="/locales" element={<PrivateRoute element={<LoacalsTable />} />} />
                <Route path="/asignaturas" element={<PrivateRoute element={<AsignaturaTable />} />} />
                <Route path="/cursos" element={<PrivateRoute element={<CursosTable />} />} />
                <Route path="/" element={<Navigate to="/horario" />} />
              </Routes>
            </div>
          </div>
{/*         </Router> */}
        <ToastContainer />
      </NextUIProvider>
    </AuthProvider>
  );
}
