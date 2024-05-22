import { HiXCircle } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";

export default function ItemBalance({ item, horarioTabla }) {

  const [asingaturaname, setasignaturaname] = useState(item.asignatura.nombre);
  const [isBalanceOK, setIsBalanceOK] = useState(false);

 {/*  const contarAsignaturas = () => {
    let contador = 0;

    horarioTabla.forEach((clase) => {
      console.log(clase.asignatura.nombre)

      if (clase.asignatura.nombre == item.asignatura.nombre) {
        contador++;
      }
    });

    if (contador === item.cantidad) {
      setIsBalanceOK(true);
    }
  }; */}

/*   useEffect(() => {
    contarAsignaturas();
  }, []); */

  return (
    <div
      className={`${item.asignatura.color} rounded m-4 shadow-sm shadow-slate-600 text-left transition-all p-2 flex justify-between`}
    >
      <h1>{item.asignatura.siglas}</h1>
      <Chip
        startContent={<HiXCircle />}
        className="ml-11"
        color={isBalanceOK ? "success" : "danger"} // Cambio de color aquí
        variant="faded"
      >
        {item.cantidad}
      </Chip>
    </div>
  );
}
