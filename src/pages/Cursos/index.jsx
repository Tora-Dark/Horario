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

const index = () => {


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
        <TableBody items={asignaturas}>
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

export default index
