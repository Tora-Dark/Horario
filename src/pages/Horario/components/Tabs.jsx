import React, { useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import { HiChevronDoubleDown } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const Tabs = ({
  asignaturas,
  asignaturaSeleccionada,
  setAsignaturaSeleccionada,
}) => {

  const [activeTab, setActiveTab] = useState(
    asignaturas && asignaturas.length > 0 ? asignaturas[0].id : null
  );
  const [visibleTabs, setVisibleTabs] = useState(0);

  const handleUp = () => {
    if (visibleTabs > 0) setVisibleTabs(visibleTabs - 1);
  };

  const handleDown = () => {
    if (visibleTabs < asignaturas.length - 4) setVisibleTabs(visibleTabs + 1);
  };

  return (
    <div className="flex flex-col mx-5 px-3 md:flex-row">
      <div className="flex flex-col items-center w-60 md:w-1/4">
        <h3 className="bg-red-300 mt-16 shadow-sm shadow-slate-900 rounded p-2 text-white  m-3 text-center flex items-center place-content-center">
          Asignaturas
        </h3>
        <IconButton onClick={handleUp}>
          <HiChevronDoubleUp  />
        </IconButton>
        {asignaturas.slice(visibleTabs, visibleTabs + 4).map((asignatura) => (
          <button
            key={asignatura.id}
            className={`text-left p-2 m-0.5 ${
              activeTab === asignatura.id
                ? "bg-sky-500 shadow-sky-500/50 shadow-lg transition-all animate-bounce rounded text-white"
                : ""
            }`}
            onClick={() => {
              setActiveTab(asignatura.id);
              setAsignaturaSeleccionada(asignatura);
              ;
            }}
          >
            {asignatura.nombre}
          </button>
        ))}
        <IconButton onClick={handleDown}>
          <HiChevronDoubleDown />
        </IconButton>
      </div>
      <div className="w-full my-40 md:w-3/4 p-2">
        <div>
          <p className="ml-3">
            Asignatura:{" "}
            {
              asignaturas.find((asignatura) => asignatura.id === activeTab)
                ?.nombre
            }
          </p>
        </div>
        <button className="bg-teal-800 shadow-teal-500/50   shadow-lg hover:bg-teal-700 p-2 m-2 rounded text-white">
          Editar
        </button>
        <button className="bg-rose-800 shadow-rose-500/50   shadow-lg hover:bg-rose-700 p-2 m-2 rounded text-white">
          Eliminar{" "}
        </button>
      </div>
    </div>
  );
};

export default Tabs;
