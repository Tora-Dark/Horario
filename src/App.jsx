import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import BrigadaTable from "./pages/Brigadas/index.jsx";
import LoacalsTable from "./pages/Locals/index.jsx";

const apiURL = "http://127.0.0.1:8000/api";

export default function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex bg-slate-100 flex-row h-[100vh]">
        <TopNavbar />

        <Routes>
          {<Route path="/" element={<Horario />} />}
          {<Route path="/horario" element={<Horario />} />}
          {<Route path="/brigadas" element={<BrigadaTable />}/>}
          {<Route path="/locales" element={<LoacalsTable />}/>}

          {<Route path="/asignaturas" element={<AsignaturaTable />} />}

          <Route path="/cursos" element={<CreateClases />} />
        </Routes>
      </div>{" "}
    </NextUIProvider>
  );
}

App.propTypes = {};
