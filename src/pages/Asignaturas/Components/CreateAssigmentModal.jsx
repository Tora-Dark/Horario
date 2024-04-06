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
const endpoint = "http://127.0.0.1:8000/api/asignaturas";
import axios from "axios";
import { HiTemplate } from "react-icons/hi";

const CreateAssigmentModal = ({
  isOpen,
  onOpen,
  onClose,
  isCHanged,
  setIsChanged,
}) => {
  const[nombre,setNombre]=useState("");
  const[siglas,setSiglas]=useState("");
  const [coulor, setcoulor] = useState("");
  const [backdrop, setBackdrop] = React.useState("opaque");
  const backdrops = ["opaque", "blur", "transparent"];
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  const [variant, setvariant] = useState("underlined");
  const store = async (e) => {
    e.preventDefault();

    await axios.post(endpoint, {
      nombre: nombre,
      siglas: siglas,
      color: coulor,
    });

    setIsChanged(true);
  };

  const colors = [
    {
      label: "Slate",
      value: "bg-slate-300",
      description: "text-slate-300",
    },
    {
      label: "Gray",
      value: "bg-gray-300",
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

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Asignatura
              </ModalHeader>
              <ModalBody>
                <form onSubmit={store} className="flex flex-col gap-4">
                  <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                   <Input type="text" variant={variant} onChange={(e) => setNombre(e.target.value)} label="Nombre" placeholder="Enter the Assigment name" />
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
                  <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input type="text" variant={variant} onChange={(e) => setSiglas(e.target.value)} label="Siglas" placeholder="Enter the Assigment siglas" />
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
  )
};

export default CreateAssigmentModal;
