import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
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
//import CreateBrigadaModal from "./CreateBrigadaModal";
//import EditBrigadaModal from "./EditBrigadaModal";
const columns = [
  { name: "NOMBRE", uid: "nombre" },
  { name: "ACTIONS", uid: "actions" },
];

const LoacalsTable = () => {
  const [locales, setLocales] = useState([]);
  const [isCHanged, setIsChanged] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [localEdit, setLocalEdit] = useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsCreateModalOpen(false);
    setisEditModalOpen(false);
  };
  const pages = Math.ceil(locales.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return locales.slice(start, end);
  }, [page, locales]);
  const handlebutton = (local) => {
    setisEditModalOpen(true);
    setLocalEdit(local);
  };

  const getlocales = async () => {
    try {
      const response = await axios.get(`${apiURL}/locales `);
      setLocales(response.data);
      setIsChanged(false);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };
  useEffect(() => {
    getlocales();
  }, [isCHanged]);
  const handleEliminarlocales = async (id) => {
    try {
      await axios.delete(`${apiURL}/locales/${id}`);
      setIsChanged(true);
      // Realiza cualquier otra acción necesaria después de eliminar la clase
    } catch (error) {
      console.error("Error al eliminar la local:", error);
    }
  };

  const renderCell = React.useCallback((local, columnKey) => {
    const cellValue = local[columnKey];
    switch (columnKey) {
      case "nombre":
        return (
          <>
            <h2>{local.nombre}</h2>
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
                <DropdownMenu variant="faded" aria-label="Static Actions">
                  <DropdownItem
                    startContent={
                      <HiOutlinePencilAlt className={iconClasses} />
                    }
                    key="edit"
                    onClick={() => handlebutton(local)}
                  >
                    Edit local
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
                    onClick={() => handleEliminarlocales(local?.id)}
                    className="text-danger"
                    color="danger"
                  >
                    Delete local
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
        <h2 className="text-lg font-bold">Locales:</h2>
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
      {/*  <CreateBrigadaModal
          isOpen={isCreateModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          isCHanged={isCHanged}
          setIsChanged={setIsChanged}
        />  */}
      {isEditModalOpen ? (
        <EditBrigadaModal
          isOpen={isEditModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
          isCHanged={isCHanged}
          localEdit={localEdit}
          setIsChanged={setIsChanged}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoacalsTable;
