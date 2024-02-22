import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ShowClases from "./components/clases/ShowClases.jsx";
import CreateClases from "./components/clases/CreateClases.jsx";
import Horario from "./pages/Horario/index.jsx";
import AssigmentBar from "./pages/Horario/components/AssigmentBar.jsx";
import { Button } from "@mui/material";



const apiURL = "http://127.0.0.1:8000/api";



export default function App() {
  

  return (
    < >
     <div className="">
      <h2 className="text-3xl font-bold mx-3 my-4 text-center">
        Horario de Clases de la brigada:
      </h2>
      <div className="flex w-full items-center place-content-center gap-4">
      <Button>hola</Button>
      </div>
   

        <BrowserRouter>
          <Routes>
            {<Route path="/" element={<Horario />} />}
            <Route path="/createClase" element={<CreateClases />} />
          </Routes>
        </BrowserRouter>
        </div>
  
    </>
  );
}

App.propTypes = {};
