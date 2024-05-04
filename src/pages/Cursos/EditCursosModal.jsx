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
const endpoint = "http://127.0.0.1:8000/api/cursos";
import axios from "axios";
import { HiTemplate } from "react-icons/hi";

function EditCursosModal({
  isOpen,
  onClose,
  onOpen,
  isCHanged,
  setIsChanged,
  cursoEdit,
}) {
  return <div></div>;
}

export default EditCursosModal;
