import React from "react";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;
/* 
const endpoint = "http://127.0.0.1:8000/api/clases"; */
import axios from "axios";
import { HiTemplate } from "react-icons/hi";
import { toast } from "react-toastify";

export default function CreateClassModal({
  isOpen,
  onOpen,
  onClose,
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
}) {
  const [tipo, setTipo] = useState("");
  const [turno, setTurn] = useState(turn);
  const [dia, setFecha] = useState(fecha);
  const [local_id, setLocal] = useState("");
  const [asignatura_id, setAsignatura_id] = useState("");
  const [brigadasSeleccionadas, setbrigadasSeleccionadas] = useState([]);
  const [coulor, setcoulor] = useState("");
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
 const { onOpenChange} = useDisclosure();
  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  const colors = [
    {
      label: "Slate",
      value: "bg-slate-300",
      description: "text-slate-300",
    },
    {
      label: "Gray",
      value:"bg-gray-300",
      description: "text-gray-300",
    },
    {
      label: "Zinc",
      value: "bg-zinc-300",
      description: "text-zinc-300",
    },
    {
      label: "Neutral",
      value: "bg-neutral-300",
      description: "text-neutral-300",
    },
    {
      label: "Stone",
      value: "bg-stone-300",
      description: "text-stone-300",
    },
    {
      label: "Red",
      value: "bg-red-300",
      description: "text-red-300",
    },
    {
      label: "Orange",
      value: "bg-orange-300",
      description: "text-orange-300",
    },
    {
      label: "Amber",
      value: "bg-amber-300",
      description: "text-amber-300",
    },
    {
      label: "Yellow",
      value: "bg-yellow-300",
      description: "text-yellow-300",
    },
    {
      label: "Green",
      value: "bg-green-300",
      description: "text-green-300",
    },
    {
      label: "Emerald",
      value: "bg-emerald-300",
      description: "text-emerald-300",
    },
    {
      label: "Teal",
      value: "bg-teal-300",
      description: "text-teal-300",
    },
    {
      label: "Cyan",
      value: "bg-cyan-300",
      description: "text-cyan-300",
    },
    {
      label: "Sky",
      value: "bg-sky-300",
      description: "text-sky-300",
    },
    {
      label: "Blue",
      value: "bg-blue-300",
      description: "text-blue-300",
    },
    {
      label: "Indigo",
      value: "bg-indigo-300",
      description: "text-indigo-300",
    },
    {
      label: "Violet",
      value: "bg-violet-300",
      description: "text-violet-300",
    },
    {
      label: "Purple",
      value: "bg-purple-300",
      description: "text-purple-300",
    },
    {
      label: "Fuchsia",
      value: "bg-fuchsia-300",
      description: "text-fuchsia-300",
    },
    {
      label: "Pink",
      value: "bg-pink-300",
      description: "text-pink-300",
    },
    {
      label: "Rose",
      value: "bg-rose-300",
      description: "text-rose-300",
    },
  ];
  const types = [
    {
      label: "C",
      value: "C",
      description: "Conferencia",
    },
    {
      label: "PP",
      value: "PP",
      description: "Prueba Parcial",
    },
    { label: "T", value: "T", description: "Taller" },
    { label: "S", value: "S", description: "Seminario" },
    { label: "CP", value: "CP", description: "Clase Practica" },
    { label: "NP", value: "NP", description: "No presencial" },
    { label: "L", value: "L", description: "Laboratorio" },
    {label: "----", value: "----", description: "----"}
  ];
  const [variant, setvariant] = useState("underlined");
  const store = async (e) => {
    e.preventDefault();
try {
  await axios.post(`${apiURL}/clases`, {
    tipo: tipo,
    turn: turno,
    fecha: dia,
    asignatura_id: asignatura_id,
    local_id: local_id,
    brigadas: brigadasSeleccionadas.split(",").map(Number),
    semana: semanasSeleccionada,
    color: coulor,
  });
  toast.success("Clase Creada con éxito");
  setIsChanged(true);
  
} catch (e) {
  toast.error(`Todo salio mal, error: ${e.message}`);
}

  };

  return (
    <>
      <Modal backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      radius="lg"
      classNames={{
      }}onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Clase
              </ModalHeader>
              <ModalBody>
                <form onSubmit={store} className="flex flex-col gap-4">
                  <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Select
                      items={types}
                      label="Type"
                      placeholder="Select an type"
                      className="max-w-xs"
                      variant="underlined"
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      {(type) => (
                        <SelectItem value={type.value} key={type.value}>
                          {type.description}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Select
                      items={colors}
                      label="Color"
                      placeholder="Select an color"
                      className="max-w-xs"
                      variant="underlined"
                      onChange={(e) => setcoulor(e.target.value)}
                    >
                      {(color) => (
                        <SelectItem textValue={color.label} key={color.value}>
                          <div className="flex gap-2 items-center">
                            <HiTemplate className={color.description} />
                            <div>
                              {color.label}
                              
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <div>
                    <Select
                      items={brigadas}
                      label="Brigadas"
                      placeholder="Select an brigade"
                      className="max-w-xs"
                      selectionMode="multiple"
                      variant="underlined"
                      onChange={(e) => {
                        {
                          setbrigadasSeleccionadas(e.target.value);
                        }
                      }}
                      value={brigadasSeleccionadas}
                    >
                      {(brigada) => (
                        <SelectItem value={brigada.id} key={brigada.id}>
                          {brigada.nombre}
                        </SelectItem>
                      )}
                    </Select>
                  </div>

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
                    <Select
                      items={locales}
                      label="Locales"
                      placeholder="Select an local"
                      className="max-w-xs"
                      variant="underlined"
                      onChange={(e) => setLocal(e.target.value)}
                    >
                      {(local) => (
                        <SelectItem value={local.id} key={local.id}>
                          {local.nombre}
                        </SelectItem>
                      )}
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    color="primary"
                    onPress={onClose}
                    type="submit"
                    className="w-6 items-center content-center"
                  >
                    Guardar
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// <div className="flex flex-wrap gap-3">
// {backdrops.map((b) => (
//   <Button
//     key={b}
//     variant="flat"
//     color="warning"
//     onPress={() => handleOpen(b)}
//     className="capitalize"
//   >
//    {b}
//   </Button>
// ))}
// </div>
