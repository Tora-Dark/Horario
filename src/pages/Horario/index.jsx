import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./components/Item.jsx";
import CenteredTabs from "./components/CenteredTabs.jsx";
import TabPanel from "./components/VerticalTabs.jsx";
import { Button } from "@nextui-org/react";
import CreateClassModal from "./components/CreateClassModal.jsx";
import { HiOutlinePlusCircle } from "react-icons/hi";

import { Spinner } from "@nextui-org/react";
import BalanceBar from "./components/BalanaceBar.jsx";
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
// const apiURL = import.meta.env.VITE_LOCAL_API_URL;
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
  const [brigadaSeleccionada, setBrigadaSeleccionada] = useState(9);

  //Arreglo cone el balance de carga
  const [balances, setBalances] = useState([]);

  //Arreglo con todas las asignaturas
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(
    asignaturas[0]
  );
  //Arreglo con todos los locales
  const [locales, setLocales] = useState([]);

  const [matriz, setMatriz] = useState([]);

  //semana para agregar
  const [semana, setSemena] = useState("");

  //se cambian las clases
  const [isCHanged, setIsChanged] = useState(false);
  //se cambian las semanas
  const [isSemanaChanged, setIsSemanaChanged] = useState(false);
  const [isBalanceChanged, setIsBalanceChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {};
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const getSemanas = async () => {
    try {
      const response = await axios.get(`${apiURL}/horarios`);
      setSemanas(response.data);
      return response.data;
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };
  const getMatriz = async () => {
    try {
      const response = await axios.get(`${apiURL}/horarios/Getmatriz/1/13`);
      setMatriz(response.data);
    } catch (err) {
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
      const brigadas = response?.data;
      setBrigadas(brigadas);
      setBrigadaSeleccionada(brigadas[0]?.id);
      return brigadas[0];
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
  const getBalances = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/balance_de_carga/${semanasSeleccionada}`
      );
      setBalances(response.data);
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
      //   .log(response.data);
      // console.log("////");
    } catch (err) {
      console.log(`error: ${err}`);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const brigada = getAllBrigadas();
    const semana = getSemanas();
    getAsignaturas();
    getAlllocales();
    getAllClases();
    getBalances();
    //getMatriz();
  }, []);
  useEffect(() => {
    getSemanas();
    setIsSemanaChanged(false);
  }, [isSemanaChanged]);
  useEffect(() => {
    getBalances();
    setIsBalanceChanged(false);
  }, [isBalanceChanged]);
  useEffect(() => {
    getAllClases();
    getBalances();
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
      return newHorario;
    });
  };

  //TODO
  const deleteHorario = async () => {
    const semanadelete = semanasSeleccionada;
    await axios.delete(`${apiURL}/horarios/${semanasSeleccionada}`);
    setSemanasSeleccionada(semanaInicial);
    setIsSemanaChanged(true);
    //getAllClases();
  };
  const addSemana = async () => {
    await axios.post(`${apiURL}/horarios `, {
      semana: semana + 1,
    });
    setIsSemanaChanged(true);
  };
  if (brigadas.length == 0 || semanas.length == 0)
    return (
      <div className="h-[100vh] w-full flex items-center place-content-center">
        <Spinner
          label="Cargando esta vaina"
          color="secondary"
          size="lg"
          labelColor="secondary"
        />
      </div>
    );

  return (
    <>
      {" "}
      <div className="flex-col w-full">
        <CenteredTabs
          brigadas={brigadas}
          brigadaSeleccionada={brigadaSeleccionada}
          setBrigadaSeleccionada={setBrigadaSeleccionada}
        />

        <div className=" flex flex-row">
          <div className="items-center place-content-center p-6 w-1/7">
            <h1 className="bg-slate-300  shadow-slate-700 rounded p-2 text-slate-700 shadow-sm m-3 text-center flex items-center place-content-center">
              SEMANAS
            </h1>
            <TabPanel
              semanas={semanas}
              semanasSeleccionada={semanasSeleccionada}
              setSemanasSeleccionada={setSemanasSeleccionada}
            />
            <div className="flex flex-col">
              <Button
                className="mt-4 ml-2"
                //onClick={
                color="primary"
                startContent={<HiOutlinePlusCircle />}
                radius="sm"
                variant="ghost"
                onClick={addSemana}
              >
                Add
              </Button>

              <Button
                className="mt-4 ml-2"
                onClick={deleteHorario}
                color="danger"
                startContent={<HiOutlinePlusCircle />}
                radius="sm"
                variant="solid"
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <HorarioTabla
              matriz={matriz}
              setMatriz={setMatriz}
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
          {/*  <div className="items-center place-content-center p-3  w-72">
        {asignaturas?.length <= 0 ? (
          <></>
        ) : (
          <VerticalTabsNew
          asignaturas={asignaturas}
          setAsignaturaSeleccionada={setAsignaturaSeleccionada}
          />
        )}{" "}
      </div> */}
          {
            <BalanceBar
              balances={balances}
              horarioTabla={horarioTabla}
              semanasSeleccionada={semanasSeleccionada}
              asignaturas={asignaturas}
              setIsBalanceChanged={setIsBalanceChanged}
            />
          }
        </div>

        {/*  <CreateClassModal
          isOpen={isModalOpen}
          onOpen={onOpenModal}
          onClose={onCloseModal}
        /> */}
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
  matriz,
  setMatriz,
}) {
  return (
    <table className="border-collapse border rounded overflow-hidden bg-white table-auto md:table-fixed border-slate-800 shadow-lg  ">
      <thead className="border bg-slate-800 h-14 text-white shadow-sm  shadow-slate-800 border-slate-800 ">
        <tr>
          <th className="px-4  py-2">Turno</th>
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
            <td className="  border-slate-700 text-center">
              <div
                className={
                  "bg-slate-800 p-4 m-2 h-16 text-white rounded text-center font-semibold place-content-center shadow-sm shadow-slate-700 transition-all "
                }
              >
                {turno + 1}
              </div>
            </td>
            {fila.map((clase, fecha) => (
              <td
                className=" w-[150px] h-auto text-white border-slate-700"
                key={fecha}
              >
                <div className="w-full h-full flex items-center place-content-center">
                  <Item
                    matriz={matriz}
                    setMatriz={setMatriz}
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
