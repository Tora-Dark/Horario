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
const endpoint = "http://127.0.0.1:8000/api/clases";
import {
  HiInformationCircle,
  HiCog,
  HiOutlineClipboardCopy,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineExclamation,
} from "react-icons/hi";
import axios from "axios";
import { HiTemplate } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";

const iconClasses = "text-xl  pointer-events-none  flex-shrink-0";
const matrizinicial = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export default function MoveClaseModal({
  isOpen,
  onOpen,
  onClose,
  isCHanged,
  setIsChanged,
  matriz,
  classMove,
  turn,
  fecha,
  semanasSeleccionada,
  clase,
  colorEdit,
  brigadas,
  brigadaSeleccionada,
  asignaturas,
  locales,
  localEdit,
  asignaturaEdit,
}) {
  const [backdrop, setBackdrop] = React.useState("opaque");
  const backdrops = ["opaque", "blur", "transparent"];
  const [tipo, setTipo] = useState(clase.tipo);
  const [turno, setTurn] = useState(turn);
  const [dia, setFecha] = useState(fecha);
  const [local_id, setLocal] = useState(localEdit);
  const [asignatura_id, setAsignatura_id] = useState(asignaturaEdit);
  const [brigadasSeleccionadas, setbrigadasSeleccionadas] = useState([]);
  const [coulor, setcoulor] = useState(colorEdit);
  const [nuevaMatriz, setNuevaMatriz] = useState(matrizinicial);
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  const getbrigadasSeleccionadas = () => {
    clase.brigadas.map((brigada) => brigadasSeleccionadas.push(brigada.id));
  };

  const getMatriz = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/horarios/Getmatriz/${semanasSeleccionada}/${classMove.id} `
      );
      setNuevaMatriz(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  useEffect(() => {
    getMatriz();
    getbrigadasSeleccionadas();
  }, []);

  const onUpdateHandler = (i, j) => {
    update(i, j);
    onClose();
  };

  const update = async (i, j) => {
    try {
      const result = await axios.put(`${endpoint}/${clase.id}`, {
        tipo: tipo,
        turn: i,
        fecha: j,
        asignatura_id: asignatura_id,
        local_id: local_id,
        brigadas: brigadasSeleccionadas,
        semana: semanasSeleccionada,
        color: coulor,
      });
      toast.success("Clase Movida con éxito");
      setIsChanged(true);
    } catch (e) {
      toast.error(`Todo salio mal, error: ${e.message}`);
    }
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        radius="lg"
        size="4xl"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Mover Clase
              </ModalHeader>
              <ModalBody>
                <table className="border-collapse border rounded overflow-hidden bg-white table-auto md:table-fixed border-slate-900 shadow-2xl ">
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
                    {nuevaMatriz.map((fila, i) => (
                      <tr key={i}>
                        <td>
                          <div
                            className={
                              "bg-slate-800 p-2 m-2 text-white rounded text-center shadow-sm shadow-slate-700 transition-all "
                            }
                          >
                            {i + 1}
                          </div>
                        </td>
                        {fila.map((valor, j) => (
                          <td
                            className=" p-3  border-slate-700 text-center"
                            key={j}
                          >
                            {valor ? (
                              <Button
                                color="primary"
                                variant="shadow"
                                radius="sm"
                                className="w-32 h-11"
                                startContent={
                                  <HiOutlineClipboardCopy
                                    className={iconClasses}
                                  />
                                }
                                onClick={() => onUpdateHandler(i + 1, j + 1)}
                                /* className={
                                  "bg-green-500 w-32 text-default-800 rounded text-lg shadow-sm shadow-slate-700 transition-all"
                                } */
                              >
                                <h1>Available</h1>
                              </Button>
                            ) : (
                              <Button
                                color="danger"
                                radius="sm"
                                variant="faded"
                                className="w-32 h-11"
                                startContent={
                                  <HiOutlineExclamation
                                    className={iconClasses}
                                  />
                                }
                                /* className={
                                  "bg-red-500  w-32 text-default-800 rounded shadow-sm text-lg  shadow-slate-700 transition-all "
                                } */
                              >
                                <h1>Unavailable</h1>
                              </Button>
                            )}
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
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
