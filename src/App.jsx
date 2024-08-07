import React from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate,useLocation
} from "react-router-dom";
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
import Home from "./pages/Home/index.jsx";

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
          <MainApp />
        <ToastContainer />
      </NextUIProvider>
    </AuthProvider>
  );
}

const MainApp = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isActive = (href) => location.pathname === href;
  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="flex flex-col bg-slate-100 h-[100vh]">
      <Navigationbar />
      <div className="flex  flex-row w-full h-full">
        <div className="">
      {user && !isActive("/home") && <TopNavbar />}

          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/horario"
            element={<PrivateRoute element={<Horario />} />}
          />
          <Route
            path="/brigadas"
            element={<PrivateRoute element={<BrigadaTable />} />}
          />
          <Route
            path="/locales"
            element={<PrivateRoute element={<LoacalsTable />} />}
          />
          <Route
            path="/asignaturas"
            element={<PrivateRoute element={<AsignaturaTable />} />}
          />
          <Route
            path="/cursos"
            element={<PrivateRoute element={<CursosTable />} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
};
