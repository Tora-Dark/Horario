import axios from "axios";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
const apiURL = import.meta.env.VITE_API_URL;

/* const endpoint = "http://127.0.0.1:8000/api/clases"; */

export default function CreateClases() {
  const [tipo, setTipo] = useState("");
  const [turn, setTurn] = useState(0);
  const [fecha, setFecha] = useState("");
  const [local_id, setLocal] = useState("");
  const [asignatura_id, setAsignatura_id] = useState("");

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    await axios.post(`${apiURL}/clases`, {
      tipo: tipo,
      turn: turn,
      fecha: fecha,
      asignatura_id: asignatura_id,
      local_id: local_id,
    });
    navigate("/");
  };

  return (
    <div className="m-5">
      <Button variant="text" color="primary">
        {" "}
        <Link
          href="/"
          variant="body5"
          underline="none"
          rel="noopener noreferrer"
        >
          Atras
        </Link>{" "}
      </Button>

      <Card variant="outlined">
        <CardContent>
          <h3>Crear Clase</h3>
          <form onSubmit={store}>
            <div className="mb-3 ">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tipo
              </label>
              <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="form-input px-4 py-3  border border-blue-300 shadow rounded-md p-4 max-w-sm w-full  bg-slate-100"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Turno
              </label>
              <input
                type="text"
                value={turn}
                onChange={(e) => setTurn(e.target.value)}
                className="form-input px-4 py-3 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full  bg-slate-100"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                fecha
              </label>
              <input
                type="text"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="form-input px-4 py-3  border border-blue-300 shadow rounded-md p-4 max-w-sm w-full  bg-slate-100"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                asignatura_id
              </label>
              <input
                type="text"
                value={asignatura_id}
                onChange={(e) => setAsignatura_id(e.target.value)}
                className="form-input px-4 py-3 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full  bg-slate-100"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                local_id
              </label>
              <input
                type="text"
                value={local_id}
                onChange={(e) => setLocal(e.target.value)}
                className="form-input px-4 py-3 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full  bg-slate-100"
              />
            </div>

            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </form>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

CreateClases.propTypes = {};
