import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Horario from "./pages/Horario/index.jsx";
import "./App.css";
import TopNavbar from "./pages/Dashboard/index.jsx";
import { NextUIProvider } from "@nextui-org/system";
import AsignaturaTable from "./pages/Asignaturas/index.jsx";
import BrigadaTable from "./pages/Brigadas/index.jsx";
import LoacalsTable from "./pages/Locals/index.jsx";
import CursosTable from "./pages/Cursos/index.jsx";
import Prueba from "./pages/prueba/index.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigationbar from "./pages/Navbar/Navigationbar.jsx";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
const apiURL = "http://127.0.0.1:8000/api";






export default function App() {
  const navigate = useNavigate();
  return (
<AuthProvider>
    <NextUIProvider navigate={navigate}>

    <div className="flex flex-col bg-slate-100 h-[100vh]">
    <Navigationbar/>  
    <div className="flex flex-row h-full">
        <TopNavbar />

          <Routes>
            {<Route path="/Horario" element={<Horario />} />}
            {<Route path="/Horario/horario" element={<Horario />} />}
            {<Route path="/Horario/brigadas" element={<BrigadaTable />} />}
            {<Route path="/Horario/locales" element={<LoacalsTable />} />}
            {<Route path="/Horario/otros" element={<Prueba />} />}
            {<Route path="/Horario/asignaturas" element={<AsignaturaTable />} />}

            <Route path="/cursos" element={<CursosTable />} />
          </Routes>
          </div>
        </div>{" "}
      </NextUIProvider>
      <ToastContainer />
  </AuthProvider>
  );
}

App.propTypes = {};
