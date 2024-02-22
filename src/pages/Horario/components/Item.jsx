import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import BasicModal from "./BasicModal.jsx";

const Item = ({
  clase,
  color,
  turn,
  fecha,
  brigadas,
  brigadaSeleccionada,
  asignaturas,
  locales,
  semanasSeleccionada,
  isCHanged,
  setIsChanged,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/createClase?turn=${turn + 1}&fecha=${fecha + 1}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  return clase ? (
    <div
      className={
        `${color} ` +
        "text-slate-700 rounded shadow-sm shadow-slate-700 transition-all m-2 w-full h-12"
      }
    >
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col w-full h-full border-r border-slate-700">
          <div className="flex justify-evenly">
            <h2>{clase?.asignatura?.nombre}</h2>
            <h2>{clase?.tipo}</h2>
          </div>
          <h2 className="text-center">{clase?.local?.nombre}</h2>
        </div>
        <div className="col-span-1 flex flex-col font-bold text-center">
          <p>+</p>
          <p>-</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="  flex items-center place-content-center transition-all m-2 w-full h-12">
      <IconButton aria-label="" onClick={() => setIsModalOpen(true)}>
        <HiOutlinePlusCircle />
      </IconButton>
      <BasicModal
        clase={clase}
        color={"bg-sky-300"}
        turn={turn + 1}
        fecha={fecha + 1}
        isOpen={isModalOpen}
        onOpen={onOpenModal}
        onClose={onCloseModal}
        brigadas={brigadas}
        brigadaSeleccionada={brigadaSeleccionada}
        asignaturas={asignaturas}
        locales={locales}
        semanasSeleccionada={semanasSeleccionada}
        isCHanged={isCHanged}
        setIsChanged={setIsChanged}
      />
    </div>
  );
};

export default Item;
