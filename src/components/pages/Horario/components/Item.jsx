import React, { useState, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import CreateClassModal from "./CreateClassModal.jsx";
import EditClassModal from "./EditClassModal.jsx";
import MoveClaseModal from "./MoveClaseModal.jsx";

import {
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import {
  HiInformationCircle,
  HiCog,
  HiOutlineClipboardCopy,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
const apiURL = import.meta.env.VITE_API_URL;

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
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
  matriz,
  setMatriz,
}) => {
  //const endpoint = "http://127.0.0.1:8000/api/clases";

  const handleEliminarClase = async (id) => {
    try {
      await axios.delete(`${apiURL}/clases/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [classMove, setclassMove] = useState(clase);
  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsModalOpen(false);
    setIsMoveModalOpen(false);
  };

  const handelMoveClass = (clase) => {
    setIsMoveModalOpen(true);
    const getMatriz = async () => {
      try {
        const response = await axios.post(`${apiURL}/horarios/1/11`);
        setMatriz(response.data);
      } catch (err) {
        console.log(`error: ${err}`);
      }
    };
  };
  return clase ? (
    <div
      className={
        `${color} ` +
        "text-slate-700 rounded shadow-sm shadow-slate-700 transition-all m-2 w-full h-16"
      }
    >
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col w-full h-full  border-slate-700">
          <div className="flex justify-evenly">
            <h2>{clase?.asignatura?.siglas}</h2>
            <h2>{clase?.tipo}</h2>
          </div>
          <h2 className="text-center">{clase?.local?.nombre}</h2>
        </div>
        <div className="col-span-1 pr-3 flex flex-col font-bold text-center">
          <div>
            <Tooltip
              placement="right"
              delay={0}
              radius="full"
              closeDelay={0}
              motionProps={{
                variants: {
                  exit: {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeIn",
                    },
                  },
                  enter: {
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  },
                },
              }}
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Acciones</div>
                </div>
              }
            >
              <div className=" items-center content-center">
                <Dropdown backdrop="opaque">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="ligth">
                      {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                      {<HiCog className="text-lg text-slate-600" />}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem
                      startContent={
                        <HiOutlinePencilAlt className={iconClasses} />
                      }
                      key="edit"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Edit class
                    </DropdownItem>
                    <DropdownItem
                      startContent={
                        <HiOutlineClipboardCopy className={iconClasses} />
                      }
                      key="move"
                      onClick={() => handelMoveClass(clase)}
                    >
                      Move class
                    </DropdownItem>
                    <DropdownItem
                      startContent={<HiOutlineTrash className={iconClasses} />}
                      key="delete"
                      onClick={() => handleEliminarClase(clase?.id)}
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              placement="bottom"
              delay={0}
              closeDelay={0}
              motionProps={{
                variants: {
                  exit: {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeIn",
                    },
                  },
                  enter: {
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  },
                },
              }}
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Description</div>
                  <div className="text-tiny">
                    <p>
                      {clase?.tipo} of {clase?.asignatura?.nombre} in{" "}
                      {clase?.local?.nombre}{" "}
                    </p>
                  </div>
                </div>
              }
            >
              <div className="pr-2 pb-2 items-center content-center">
                <Button size="sm" radius="full" isIconOnly variant="ligth">
                  {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                  {<HiInformationCircle className="text-lg text-slate-600" />}
                </Button>
              </div>
            </Tooltip>
          </div>
        </div>
        <EditClassModal
          turn={turn + 1}
          fecha={fecha + 1}
          isOpen={isModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          clase={clase}
          colorEdit={color}
          brigadas={brigadas}
          brigadaSeleccionada={brigadaSeleccionada}
          asignaturas={asignaturas}
          locales={locales}
          semanasSeleccionada={semanasSeleccionada}
          isCHanged={isCHanged}
          setIsChanged={setIsChanged}
          localEdit={clase.local.id}
          asignaturaEdit={`${clase.asignatura.id}`}
        />
      </div>
      {isMoveModalOpen ? (
        <MoveClaseModal
          isOpen={isMoveModalOpen}
          matriz={matriz}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          turn={turn + 1}
          fecha={fecha + 1}
          isCHanged={isCHanged}
          classMove={clase}
          setIsChanged={setIsChanged}
          semanasSeleccionada={semanasSeleccionada}
          clase={clase}
          colorEdit={color}
          brigadas={brigadas}
          brigadaSeleccionada={brigadaSeleccionada}
          asignaturas={asignaturas}
          locales={locales}
          localEdit={clase.local.id}
          asignaturaEdit={`${clase.asignatura.id}`}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="bg-slate-200 flex items-center place-content-center text-slate-700 rounded shadow-sm overflow-hidden shadow-slate-700 transition-all m-2 w-full h-16">
      <Button
        radius="full"
        isIconOnly
        variant="ligth"
        size="sm"
        aria-label=""
        onClick={() => setIsModalOpen(true)}
      >
        {<HiOutlinePlusCircle className="text-xl text-current" />}
      </Button>
      <CreateClassModal
        clase={clase}
        color={color}
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
