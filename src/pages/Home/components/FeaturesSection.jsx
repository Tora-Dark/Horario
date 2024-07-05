import { Card } from "flowbite-react";
import { BiBook, BiCalculator, BiCalendar } from "react-icons/bi";
import { FaDrumSteelpan, FaPalette } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";

/* BiCalendar
FaDrumSteelpan
FaPalette
LuSettings
BiCalculator
BiBook
 */
const features1 = [
  {
    Icon: BiCalendar,
    title: "Vista de Horario Semanal",
    description:
      "Visualiza el horario de tu escuela en una vista semanal clara y organizada, facilitando la gestión de clases y recursos.",
  },
  {
    Icon: FaDrumSteelpan,
    title: "Programación por Matriz de disponibilidad",
    description:
      "Reorganiza fácilmente tu horario simplemente tocando Mover Clase y tocando a nuevas ubicaciones en el mismo horario.",
  },
  {
    Icon: FaPalette,
    title: "Asignaturas Codificadas por Color",
    description:
      "Identifica fácilmente diferentes asignaturas y clases con nuestro intuitivo sistema de codificación por colores.",
  },
];
const features2 = [
  {
    Icon: LuSettings,
    title: "Gestión de Cursos y Aulas",
    description:
      "Administra los cursos de tu escuela, profesores y aulas disponibles para optimizar la utilización de recursos.",
  },
  {
    Icon: BiCalculator,
    title: "Programación Inteligente",
    description:
      "Nuestro algoritmo avanzado identifica espacios vacíos y equilibra la carga de trabajo, asegurando un horario eficiente y bien estructurado.",
  },
  {
    Icon: BiBook,
    title: "Documentación Completa",
    description:
      "Explora nuestra documentación detallada y guías paso a paso para aprovechar al máximo las funciones de Schedulario.",
  },
];
export default function FeaturesSection() {
  return (
    <section id="features" className="flex p-4  bg-slate-200 flex-col  ">
      <div className=" mx-auto  space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Características Clave</h2>
          <p className="text-muted-foreground text-lg">
            Schedulario ofrece un conjunto completo de funciones para agilizar
            el proceso de programación de tu escuela.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start place-content-start  gap-4 m-4">
          <div className="h-full">
            {features1.map(({ Icon, title, description }) => (
              <Card key={title} className="mb-4 bg-slate-100">
                <div className="px-6 flex flex-row gap-4">
                  <div className="row-span-4">
                    <Icon className="w-10 h-10 rounded-full p-2 bg-slate-200 shadow-slate-700 shadow-md  text-secondary" />
                  </div>
                  <div className=" md:h-40 flex flex-col ">
                    <h3 className="text-xl pt-2 font-bold">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="">
            {features2.map(({ Icon, title, description }) => (
              <Card key={title} className="mb-4 bg-slate-100">
                <div className="px-6 flex flex-row gap-4    ">
                  <div className="row-span-4">
                    <Icon className="w-10 h-10 text-primary rounded-full p-2 bg-slate-200 shadow-slate-700 shadow-md" />
                  </div>
                  <div className="md:h-40 pt-2  flex flex-col ">
                    <h3 className="font-bold text-xl">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
