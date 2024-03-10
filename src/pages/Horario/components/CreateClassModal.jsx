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
const endpoint = "http://127.0.0.1:8000/api/clases";
import axios from "axios";

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

  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  const types = [
    {
      label: "C",
      value: "c",
      description: "Conferencia",
    },
    {
      label: "PP",
      value: "pp",
      description: "Prueba Parcial",
    },
    { label: "T", value: "T", description: "Taller" },
    { label: "S", value: "S", description: "Seminario" },
    { label: "CP", value: "CP", description: "Clase Practica" },
    { label: "NP", value: "NP", description: "No presencial" },
    { label: "L", value: "L", description: "Laboratorio" },
  ];
  const [variant, setvariant] = useState("underlined");
  const store = async (e) => {
    e.preventDefault();

    await axios.post(endpoint, {
      tipo: tipo,
      turn: turno,
      fecha: dia,
      asignatura_id: asignatura_id,
      local_id: local_id,
      brigadas: brigadasSeleccionadas.split(",").map(Number),
      semana: semanasSeleccionada,
    });

    setIsChanged(true);
    navigate("/");
  };

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
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
                          {type.label}
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
                          console.log(brigadasSeleccionadas);
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
