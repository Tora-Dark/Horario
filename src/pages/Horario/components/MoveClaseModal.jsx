import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const apiURL = "http://127.0.0.1:8000/api";
import axios from "axios";
import { HiTemplate } from "react-icons/hi";
import React, { useEffect, useState } from "react";

export default function MoveClaseModal({
  isOpen,
  onOpen,
  onClose,
  isCHanged,
  setIsChanged,
  matriz,
  classMove
}) {
  const [backdrop, setBackdrop] = React.useState("opaque");
  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  return (
    <>
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      radius="lg"
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Clase
            </ModalHeader>
            <ModalBody>
              <table className="border-collapse border bg-white table-auto md:table-fixed border-slate-500 shadow-lg ">
                <thead className="border bg-slate-800 h-10 text-white border-slate-600 ">
                  <tr>
                    <th className="px-4 py-2">Turno</th>
                    <th className="px-4 py-2">Lunes</th>
                    <th className="px-4 py-2">Martes</th>
                    <th className="px-4 py-2">Miércoles</th>
                    <th className="px-4 py-2">Jueves</th>
                    <th className="px-4 py-2">Viernes</th>
                  </tr>
                </thead>
                <tbody>
                  {matriz.map((fila, i) => (
                    <tr key={i}>
                      <td className="border p-3 m- border-slate-700 text-center">
                        {i + 1}
                      </td>
                      {fila.map((valor, j) => (
                        <td
                          className="border p-3 m- border-slate-700 text-center"
                          key={j}
                        >
                          {valor ? "Verdadero" : "Falso"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  );
}
