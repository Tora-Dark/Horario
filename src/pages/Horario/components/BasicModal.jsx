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

export default function BasicModal({
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
  const [variant, setvariant] = useState("underlined");
  const store = async (e) => {
   
    e.preventDefault();

    await axios.post(endpoint, {
      tipo: tipo,
      turn: turno,
      fecha: dia,
      asignatura_id: asignatura_id,
      local_id: local_id,
      brigadas: brigadasSeleccionadas.split(',').map(Number),
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
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      type="text"
                      variant="underlined"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      label="Tipo"
                    />
                  </div>
                  <Select
                    items={brigadas}
                    label="Brigadas"
                    placeholder="Select an brigade"
                    className="max-w-xs"
                    selectionMode="multiple"
                    variant="underlined"
                    onChange={(e) => {{ setbrigadasSeleccionadas(e.target.value); console.log(brigadasSeleccionadas) }}}
                    value={brigadasSeleccionadas}
                  >
                    {(brigada) => (
                      <SelectItem value={brigada.id} key={brigada.id}>

                        {brigada.nombre}
                      </SelectItem>
                    )}
                  </Select>

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

                  <Button
                    variant="contained"
                    color="primary"
                    onPress={onClose}
                    type="submit"
                  >
                    Guardar
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
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
