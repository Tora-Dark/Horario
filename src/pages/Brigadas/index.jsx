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
const iconClasses = "text-xl  pointer-events-none flex-shrink-0";
const apiURL = "http://127.0.0.1:8000/api";

import axios from "axios";
import CreateBrigadaModal from "./CreateBrigadaModal";
import EditBrigadaModal from "./EditBrigadaModal";
const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "ACTIONS", uid: "actions" },
];
const BrigadaTable = () => {
  const [brigadas, setBrigadas] = useState([]);
  const [isCHanged, setIsChanged] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [brigadaEdit, setbrigadaEdit] = useState([]);
  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsCreateModalOpen(false);
    setisEditModalOpen(false);
  };
  const handlebutton = (brigada) => {
    setisEditModalOpen(true);
    setbrigadaEdit(brigada);
  };

  const getBrigadas = async () => {
    try {
      const response = await axios.get(`${apiURL}/brigadas `);
      setBrigadas(response.data);
      setIsChanged(false);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
  useEffect(() => {
    getBrigadas();
  }, [isCHanged]);
  const handleEliminarBrigada = async (id) => {
    try {
      await axios.delete(`${apiURL}/brigadas/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  const renderCell = React.useCallback((brigada, columnKey) => {
    const cellValue = brigada[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <>
            <h2>{brigada.nombre}</h2>
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
                    onClick={() => handlebutton(brigada)}
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
                    onClick={() => handleEliminarBrigada(brigada?.id)}
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
        <h2 className="text-lg font-bold">Brigadas:</h2>
        <Button
          color="primary"
          variant="flat"
          radius="sm"
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
          <TableBody items={brigadas}>
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
      {
        <CreateBrigadaModal
          isOpen={isCreateModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          isCHanged={isCHanged}
          setIsChanged={setIsChanged}
        />
      }
      {isEditModalOpen ? (
        <EditBrigadaModal
          isOpen={isEditModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          isCHanged={isCHanged}
          brigadaEdit={brigadaEdit}
          setIsChanged={setIsChanged}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BrigadaTable;
