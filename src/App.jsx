import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import axios from "axios";
import ShowClases from "./components/clases/ShowClases.jsx";
import CreateClases from "./components/clases/CreateClases.jsx";
import Horario from "./pages/Horario/index.jsx";
import AssigmentBar from "./pages/Horario/components/AssigmentBar.jsx";
import { Button } from "@mui/material";
import "./App.css";
import TopNavbar from "./pages/Dashboard/index.jsx";
import { NextUIProvider } from "@nextui-org/system";
import AsignaturaTable from "./pages/Asignaturas/index.jsx";

const apiURL = "http://127.0.0.1:8000/api";

export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider  navigate={navigate}>
    <>
      <div>

   
        <div className="flex flex-row">
        <div className="w-64 bg-slate-600 shadow-md rounded shadow-slate-700">
        <TopNavbar />
        </div>
          <Routes>
          {<Route path="/" element={<Horario />} />}
            {<Route path="/horario" element={<Horario />} />}
            {<Route path="/asignaturas" element={<AsignaturaTable />} />}
            <Route path="/cursos" element={<CreateClases />} />
          </Routes>
          </div>
     
      </div>
    </>
    </NextUIProvider>
  );
}

App.propTypes = {};
