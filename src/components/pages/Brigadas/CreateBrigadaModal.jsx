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
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
/* 
const endpoint = "http://127.0.0.1:8000/api/brigadas"; */
import axios from "axios";
import { HiTemplate } from "react-icons/hi";

const CreateBrigadaModal = ({
  isOpen,
  onOpen,
  onClose,
  isCHanged,
  setIsChanged,
}) => {
  const [nombre, setNombre] = useState("");
  const [backdrop, setBackdrop] = React.useState("opaque");
  const backdrops = ["opaque", "blur", "transparent"];
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  const [variant, setvariant] = useState("underlined");
  const store = async (e) => {
    e.preventDefault();

    await axios.post(`${apiURL}/brigadas`, {
      nombre: nombre,
    });

    setIsChanged(true);
  };
  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Brigada
              </ModalHeader>
              <ModalBody>
                <form onSubmit={store} className="flex flex-col gap-4">
                  <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      type="text"
                      variant={variant}
                      onChange={(e) => setNombre(e.target.value)}
                      label="Nombre"
                      placeholder="Enter the Assigment name"
                    />
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
};

export default CreateBrigadaModal;
