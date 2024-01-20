import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ShowClases from "./components/clases/ShowClases.jsx";
import CreateClases from "./components/clases/CreateClases.jsx";
import Horario from "./pages/Horario/index.jsx";
import AssigmentBar from "./pages/Horario/components/AssigmentBar.jsx";
import TabPanel from "./pages/Horario/components/WeekBar.jsx";

const apiURL = "http://127.0.0.1:8000/api";



export default function App() {
  

  return (
    <>
     
      <h2 className="text-3xl font-bold mx-3 my-4 text-center">
        Horario de Clases de la brigada:
      </h2>
      <div className="flex w-full items-center place-content-center gap-4">
        <a className="bg-emerald-500  shadow-emerald-500/50  hover:bg-emerald-700 rounded p-2 text-white shadow-lg btn-lg m-3">
          Agregar Asigatura
        </a>

        <a className="bg-emerald-500  shadow-emerald-500/50 hover:bg-emerald-700 rounded p-2 text-white shadow-lg btn-lg m-3">
          Agregar Local
        </a>
      </div>

     

        <BrowserRouter>
          <Routes>
            {<Route path="/" element={<Horario />} />}
            <Route path="/createClase" element={<CreateClases />} />
          </Routes>
        </BrowserRouter>

  
    </>
  );
}

App.propTypes = {};
