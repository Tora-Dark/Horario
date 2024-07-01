import React, { useEffect, useState } from "react";
import axios from "axios";
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

/* const apiURL = "http://127.0.0.1:8000/api/balance_de_carga"; */
import { HiBadgeCheck } from "react-icons/hi";
import {
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast } from "react-toastify";

import { HiXCircle } from "react-icons/hi";
import ItemBalance from "./ItemBalance";
export default function BalanceBar({
  balances,
  asignaturas,
  semanasSeleccionada,
  setIsBalanceChanged,
  horarioTabla,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [asignatura_id, setAsignatura_id] = useState("");
  const [cantidad, setCantidad] = useState("");

  const store = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiURL}/balance_de_carga`, {
        asignatura_id: asignatura_id,
        horario_id: semanasSeleccionada,
        cantidad: cantidad,
      });
      toast.success("Balance añadido con éxito");
      setIsBalanceChanged(true);
    } catch (e) {
      toast.error(`Todo salio mal, error: ${e.message}`);
    }
  };
  return balances ? (
    <div className="bg-white m-4 overflow-hidden rounded-md  w-80 h-full shadow-md">
      <div className="flex flex-row justify-center gap-7 bg-slate-800 p-2  shadow-sm shadow-slate-800 border-slate-600 text-white items-center content-center text-center">
        <h2 className="text-large font-semibold">Balance de Carga</h2>
        <Button
          onPress={onOpen}
          className="bg-gradient-to-tr from-blue-300 to-indigo-500 shadow-current text-white shadow-sm"
        >
          + Añadir
        </Button>
      </div>
      {balances.map((item) => (
        <ItemBalance
          key={item.id}
          horarioTabla={horarioTabla}
          balances={balances}
          asignaturas={asignaturas}
          semanasSeleccionada={semanasSeleccionada}
          item={item}
        />
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Añadir Balance de asignatura
              </ModalHeader>
              <ModalBody>
                <form onSubmit={store} className="flex flex-col gap-4">
                  <Input
                    autoFocus
                    label="Cantidad"
                    placeholder="Introduzca la cantidad de turnos"
                    className="max-w-xs"
                    variant="underlined"
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                  <div>
                    <Select
                      items={asignaturas}
                      label="Asignaturas"
                      placeholder="Select an asignatura"
                      className="max-w-xs"
                      variant="underlined"
                      onChange={(e) => setAsignatura_id(e.target.value)}
                    >
                      {(asignatura) => (
                        <SelectItem value={asignatura.id} key={asignatura.id}>
                          {asignatura.nombre}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <div>
                    <Button
                      variant="solid"
                      color="primary"
                      onPress={onClose}
                      type="submit"
                      className="w-6 items-center content-center"
                    >
                      Guardar
                    </Button>
                    <Button
                      color="danger"
                      className="w-6 items-center content-center"
                      variant="ghost"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <div>
      <h2>No hay nada por ahora</h2>
    </div>
  );
}
