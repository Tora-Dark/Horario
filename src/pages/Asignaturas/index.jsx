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
import IconButton from "@mui/material/IconButton";
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
const endpoint = "http://127.0.0.1:8000/api/asignaturas";

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

import axios from "axios";
import CreateAssigmentModal from "./Components/CreateAssigmentModal";
const apiURL = "http://127.0.0.1:8000/api";

const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "SIGLAS", uid: "siglas" },
  { name: "COLOR", uid: "color" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AsignaturaTable() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [isCHanged, setIsChanged] = useState(false);
  const [coulor, setcoulor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const getAsignaturas = async () => {
    try {
      const response = await axios.get(`${apiURL}/asignaturas`);
      setAsignaturas(response.data);
      setIsChanged(false);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
  useEffect(() => {
    getAsignaturas();
  }, [isCHanged]);
  const handleEliminarClase = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };
  const renderCell = React.useCallback((asignatura, columnKey) => {
    const cellValue = asignatura[columnKey];
    switch (columnKey) {
      case "nombre":
        return <h2>{asignatura.nombre}</h2>;
      case "siglas":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "color":
        return (
          <>
            {
              <Chip className={`${cellValue} `} size="sm">
                {cellValue}
              </Chip>
            }
          </>
        );
      case "actions":
        return (
          <>
            <div className="ml-1 items-center content-center">
              <Dropdown color="default" backdrop="opaque">
                <DropdownTrigger>
                  <IconButton variant="bordered" size="small">
                    {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                    <HiCog />
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
                    onClick={() => handleEliminarClase(asignatura?.id)}
                    className="text-danger"
                    color="danger"
                  >
                    Delete file
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
    <div className="flex flex-col items-center content-center align-middle w-full h-full m-5">
      <div className="flex flex-row items-center gap-4 content-center align-middle ">
        <h2 className="text-lg font-bold float-right">Asignaturas:</h2>
        <Button
          color="primary"
          variant="flat"
          startContent={<HiOutlinePlusCircle />}
          onClick={() => setIsModalOpen(true)}
        >
          Añadir
        </Button>
      </div>
      <div className="flex items-center content-center align-middle w-full">
        <Table className="border-collapse border rounded-2xl table-auto md:table-fixed  shadow-lg" aria-label="Example table with dynamic content">
          <TableHeader className="" columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={asignaturas}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CreateAssigmentModal
        isOpen={isModalOpen}
        onOpen={onOpenModal}
        onClose={onCloseModal}
        isCHanged={isCHanged}
        setIsChanged={setIsChanged}
      />
    </div>
  );
}
