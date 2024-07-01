import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import {
  HiInformationCircle,
  HiCog,
  HiOutlineClipboardCopy,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { HiOutlinePencil, HiPencilAlt, HiTrash } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { HiCube } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

/* const apiURL = "http://127.0.0.1:8000/api"; */
const iconClasses = "text-xl  pointer-events-none flex-shrink-0";

import axios from "axios";
import EditCursosModal from "./EditCursosModal";
import CreateCursosModal from "./CreateCursosModal";
const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "ACTIONS", uid: "actions" },
];
export default function CursosTable (){
  const [cursos, setCursos] = useState([]);
  const [isCHanged, setIsChanged] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [cursosEdit, setCursosdit] = useState([]);
  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsCreateModalOpen(false);
    setisEditModalOpen(false);
  };
  const handlebutton = (curso) => {
    setisEditModalOpen(true);
    setCursosdit(curso);
  };

  const getCursos = async () => {
    try {
      const response = await axios.get(`${apiURL}/cursos `);
      setCursos(response.data);
      setIsChanged(false);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
  useEffect(() => {
    getCursos();
  }, [isCHanged]);
  const handleEliminarCurso = async (id) => {
    try {
      await axios.delete(`${apiURL}/cursos/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };

  const renderCell = React.useCallback((curso, columnKey) => {
    const cellValue = curso[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <>
            <h2>{curso.nombre}</h2>
          </>
        );
      case "actions":
        return (
          <>
            <div className="ml-1 items-center content-center">
              <Dropdown color="default" backdrop="opaque">
                <DropdownTrigger>
                  <Button isIconOnly variant="light" size="lg">
                    {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                    <HiCog className="text-xl" />

                    
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Static Actions">
                  <DropdownItem
                    startContent={
                      <HiOutlinePencilAlt className={iconClasses} />
                    }
                    key="edit"
                    onClick={() => handlebutton(curso)}
                  >
                    Edit brigada
                  </DropdownItem>
                  {/*  <DropdownItem
                    startContent={
                      <HiOutlineClipboardCopy className={iconClasses} />
                    }
                    key="move"
                  >
                    Move assigment
                  </DropdownItem> */}
                  <DropdownItem
                    startContent={<HiOutlineTrash className={iconClasses} />}
                    key="delete"
                    onClick={() => handleEliminarCurso(curso?.id)}
                    className="text-danger"
                    color="danger"
                  >
                    Delete brigada
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col items-center content-center align-middle w-full h-full mx-5">
    <div className="flex flex-row items-center justify-between w-full py-4">
      <h2 className="text-lg font-bold">Asignaturas:</h2>
      <Button
        color="primary"
        variant="flat"
        startContent={<HiOutlinePlusCircle />}
        onClick={() => setIsCreateModalOpen(true)}
      >
        Añadir
      </Button>
    </div>
    <div className="flex items-center content-center align-middle w-full">
      <Table
        className="border-collapse border rounded-2xl table-auto md:table-fixed  shadow-lg"
        aria-label="Example table with dynamic content"
      >
        <TableHeader className="" columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={cursos}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)} </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <CreateCursosModal
      isOpen={isCreateModalOpen}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      isCHanged={isCHanged}
      setIsChanged={setIsChanged}
    />
    {isEditModalOpen ? (
      <EditCursosModal
        isOpen={isEditModalOpen}
        onOpen={onOpenModal}
        onClose={onCloseModal}
        isCHanged={isCHanged}
        cursosEdit={cursosEdit}
        setIsChanged={setIsChanged}
      />
    ) : (
      <></>
    )}
  </div>
);
}
