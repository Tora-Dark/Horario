import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./components/Item.jsx";
import CenteredTabs from "./components/CenteredTabs.jsx";
import TabPanel from "./components/VerticalTabs.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { VerticalTabsNew } from "./components/VerticalTabsNew.jsx";
import Button from "@mui/material/Button";
import CreateClassModal from "./components/CreateClassModal.jsx";

const apiURL = "http://127.0.0.1:8000/api";
// const apiURL = import.meta.env.VITE_API_URL;
const horarioInicial = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const semanaInicial = 1;
const inicialBrigada = 0;

export default function Horario() {
  const [isLoading, setIsLoading] = useState(true);
  //Todas las clases de una semana
  const [clases, setClases] = useState([]);

  //Arreglo bidimensional con todas las clases para una semana / una brigada
  const [horarioTabla, setHorarioTabla] = useState(horarioInicial);

  //Arreglo con todas las semanas
  const [semanas, setSemanas] = useState([]);
  const [semanasSeleccionada, setSemanasSeleccionada] = useState(semanaInicial);

  //Arreglo con todas las brigadas
  const [brigadas, setBrigadas] = useState([]);
  const [brigadaSeleccionada, setBrigadaSeleccionada] = useState(1);

  //Arreglo con todas las asignaturas
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(
    asignaturas[0]
  );
  //Arreglo con todos los locales
  const [locales, setLocales] = useState([]);

  const [isCHanged, setIsChanged] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const getSemanas = async () => {
    try {
      const response = await axios.get(`${apiURL}/horarios`);
      setSemanas(response.data);
    } catch (error) {
      console.log(`error: ${err}`);
    }
  };

  const getAlllocales = async () => {
    try {
      const response = await axios.get(`${apiURL}/locales`);
      setLocales(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  const getAllBrigadas = async () => {
    try {
      const response = await axios.get(`${apiURL}/brigadas`);
      setBrigadas(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  const getAsignaturas = async () => {
    try {
      const response = await axios.get(`${apiURL}/asignaturas`);
      setAsignaturas(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  //Trae todas las clases de la semana seleccionada
  const getAllClases = async () => {
    setIsLoading(true);
    setIsChanged(false);
    try {
      const response = await axios.get(
        `${apiURL}/horarios/${semanasSeleccionada}`
      );
      setClases(response.data.clases);

      // console.log("////");
      //console.log(response.data);
      // console.log("////");
    } catch (err) {
      console.log(`error: ${err}`);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBrigadas();
    getSemanas();
    getAsignaturas();
    getAlllocales();
  }, []);

  useEffect(() => {
    getAllClases();
  }, [semanasSeleccionada]);
  useEffect(() => {
    getAllClases();
  }, [isCHanged]);
  useEffect(() => {
    crearHorarioTabla(clases);
  }, [brigadaSeleccionada]);

  useEffect(() => {
    crearHorarioTabla(clases);
  }, [clases]);

  // const crearHorarioTabla = (clases) => {
  //   setHorarioTabla((prevHorario) => {
  //     // Crear una copia profunda de prevHorario para evitar mutaciones directas
  //     const newHorario = prevHorario.map((dia) => dia.map((clase) => clase));

  //     clases.forEach((clase) => {
  //       const { fecha, turn, tipo } = clase;

  //       // Verificar si el turno existe en newHorario, si no, inicializarlo
  //       if (!newHorario[turn - 1]) {
  //         newHorario[turn - 1] = new Array(5).fill("");
  //       }

  //       // Asignar la clase al día y turno correspondiente
  //       newHorario[turn - 1][fecha - 1] = clase;
  //     });
  //     console.log(JSON.stringify(newHorario));
  //     return newHorario;
  //   });
  // };

  const crearHorarioTabla = (clases) => {
    setHorarioTabla(() => {
      // Iniciar newHorario con una copia del horario inicial
      const newHorario = horarioInicial.map((fila) => [...fila]);

      clases.forEach((clase) => {
        const { fecha, turn, tipo, brigadas } = clase;
        //console.log(clase)
        //Mostrar las clases segun la brigada seleccionda
        brigadas.map((brigada) => {
          // Asegurarse de que los índices fecha y turn estén en el rango correcto
          if (
            turn >= 1 &&
            turn <= 6 &&
            fecha >= 1 &&
            fecha <= 5 &&
            brigada?.id == brigadaSeleccionada
          ) {
            // Asignar la clase al día y turno correspondiente
            newHorario[turn - 1][fecha - 1] = clase;
          }
        });
      });
      // alert(JSON.stringify(newHorario));
      return newHorario;
    });
  };

  //TODO
  const deleteClase = async () => {
    await axios.delete(`${apiURL}/clases/${id}`);
    getAllClases();
  };

  if (brigadas.length == 0 || semanas.length == 0)
    return (
      <div className="h-[100vh] w-full flex items-center place-content-center">
        <h2>Cargando esta vaina</h2>
      </div>
    );

  return (
    <>
      {" "}
      <div className="flex flex-row items-center place-content-center">
        <div className="flex-col items-center  place-content-center">
          <CenteredTabs
            brigadas={brigadas}
            brigadaSeleccionada={brigadaSeleccionada}
            setBrigadaSeleccionada={setBrigadaSeleccionada}
          />

          <div className=" flex flex-row items-center place-content-center">
            <div className="items-center place-content-center p-6 w-1/7">
              <h1 className="bg-slate-300  shadow-slate-700 rounded p-2 text-slate-700 shadow-sm m-3 text-center flex items-center place-content-center">
                SEMANAS
              </h1>
              <TabPanel
                semanas={semanas}
                semanasSeleccionada={semanasSeleccionada}
                setSemanasSeleccionada={setSemanasSeleccionada}
              />
            </div>
            <div className="mt-4">
              <HorarioTabla
                horarioTabla={horarioTabla}
                brigadas={brigadas}
                brigadaSeleccionada={brigadaSeleccionada}
                asignaturas={asignaturas}
                locales={locales}
                semanasSeleccionada={semanasSeleccionada}
                isCHanged={isCHanged}
                setIsChanged={setIsChanged}
              />
            </div>
            <div className="items-center place-content-center p-3  w-72">
              {asignaturas?.length <= 0 ? (
                <></>
              ) : (
                <VerticalTabsNew
                  asignaturas={asignaturas}
                  setAsignaturaSeleccionada={setAsignaturaSeleccionada}
                />
              )}{" "}
            </div>
          </div>
        </div>
        <CreateClassModal
          isOpen={isModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
        />
      </div>
    </>
  );
}

Horario.propTypes = {};

export function HorarioTabla({
  horarioTabla,
  brigadas,
  brigadaSeleccionada,
  asignaturas,
  locales,
  semanasSeleccionada,
  isCHanged,
  setIsChanged,
}) {
  return (
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
        {horarioTabla.map((fila, turno) => (
          <tr key={turno}>
            <td className="border p-3 m- border-slate-700 text-center">
              {turno + 1}
            </td>
            {fila.map((clase, fecha) => (
              <td
                className="border w-[150px] h-auto text-white border-slate-700"
                key={fecha}
              >
                <div className="w-full h-full flex items-center place-content-center">
                  <Item
                    clase={clase}
                    color={clase?.asignatura?.color}
                    turn={turno}
                    fecha={fecha}
                    brigadas={brigadas}
                    brigadaSeleccionada={brigadaSeleccionada}
                    asignaturas={asignaturas}
                    locales={locales}
                    semanasSeleccionada={semanasSeleccionada}
                    isCHanged={isCHanged}
                    setIsChanged={setIsChanged}
                  />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
