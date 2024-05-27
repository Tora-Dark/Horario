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
  Pagination,
  Button,
 // Dropdown,
 // DropdownMenu,
  //DropdownTrigger,
  //DropdownItem,
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
const endpoint = "http://127.0.0.1:8000/api/asignaturas";

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

import axios from "axios";
import CreateAssigmentModal from "./Components/CreateAssigmentModal";
import EditAssigmentModal from "./Components/EditAssigmentModal";
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [asignaturaEdit, setasignaturaEdit] = useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsCreateModalOpen(false);
    setisEditModalOpen(false);
  };
  const pages = Math.ceil(asignaturas.length / rowsPerPage);



  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return asignaturas.slice(start, end);
  }, [page, asignaturas]);
  const handlebutton = (asignatura) => {
    setisEditModalOpen(true);
    console.log(asignatura);
    setasignaturaEdit(asignatura);
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
  const handleEliminarAsignatura = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };
  const handleAction = (key,asignatura) => {
    console.log("Hiciste clic en: ", key);
  };

  const renderCell = React.useCallback((asignatura, columnKey) => {
    const cellValue = asignatura[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <div className="">
            <h2>{asignatura.nombre}</h2>
          </div>
        );
      case "siglas":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "color":
        return (
          <>
            {
              <Chip className={`${cellValue} ` + "border shadow-md"} size="sm">
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
                <Button isIconOnly color="danger" variant="light" aria-label="Like">
                    {/* Descomentar la linea de abajo una vez se haya mandado el horario a los alumnos para seguir con el Desarrollo y comentarla cuando se vaya a enviar */}
                    <HiCog className="text-xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" onAction={handleAction} aria-label="Static Actions">
                  <DropdownItem
                    startContent={
                      <HiOutlinePencilAlt className={iconClasses} />
                    }
                    key="edit"
                    onClick={() => handlebutton(asignatura?.id)}
                  >
                    Edit assigment
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
                    onClick={() => handleEliminarAsignatura(asignatura?.id)}
                    className="text-danger"
                    color="danger"
                  >
                    Delete assigment
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
          variant="ghost"
          radius="sm"
          className="text-lg"
          startContent={<HiOutlinePlusCircle />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Añadir
        </Button>
      </div>
      <div className="flex items-center content-center align-middle w-full">
        <Table
        isStriped
          className="border-collapse border rounded-2xl table-auto md:table-fixed  shadow-lg"
          aria-label="Example table with dynamic content"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader className="" columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
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
      <CreateAssigmentModal
        isOpen={isCreateModalOpen}
        onOpen={onOpenModal}
        onClose={onCloseModal}
        isCHanged={isCHanged}
        setIsChanged={setIsChanged}
      />
      {isEditModalOpen ? (
        <EditAssigmentModal
          isOpen={isEditModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          isCHanged={isCHanged}
          asignaturaedit={asignaturaEdit}
          setIsChanged={setIsChanged}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
