import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CreateClassModal from "./CreateClassModal.jsx";
import EditClassModal from "./EditClassModal.jsx";
import {
  Tooltip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import {
  HiInformationCircle,
  HiCog,
  HiOutlineClipboardCopy,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
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
}) => {
  const endpoint = "http://127.0.0.1:8000/api/clases";
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/createClase?turn=${turn + 1}&fecha=${fecha + 1}`);
  };
  const handleEliminarClase = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
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
        "text-slate-700 rounded shadow-sm shadow-slate-700 transition-all m-2 w-full h-14"
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
        <div className="col-span-1 flex flex-col font-bold text-center">
          <div>
            <Tooltip
              placement="right"
              color=""
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
                  <div className="text-small font-bold">Acciones</div>
                </div>
              }
            >
              <div className="ml-1 items-center content-center">
                <Dropdown color="default" backdrop="opaque">
                  <DropdownTrigger>
                    <IconButton variant="bordered" size="small">
                      {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                      {/*<HiCog />*/}
                    </IconButton>
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
                      Class of {clase?.asignatura?.nombre} in{" "}
                      {clase?.local?.nombre}{" "}
                    </p>
                  </div>
                </div>
              }
            >
              <div className="ml-1 items-center content-center">
                <IconButton aria-label="" size="small">
                  {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                  {/* <HiInformationCircle  /> */}
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </div>
        <EditClassModal
          clase={clase}
          colorEdit={color}
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
          localEdit={clase.local.id}
          asignaturaEdit={`${clase.asignatura.id}`}
        />
      </div>
    </div>
  ) : (
    <div className="  flex items-center place-content-center transition-all m-2 w-full h-14">
      <IconButton aria-label="" onClick={() => setIsModalOpen(true)}>
        {/* <HiOutlinePlusCircle /> */}
      </IconButton>
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
