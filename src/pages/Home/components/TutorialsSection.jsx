import { FaVideo } from 'react-icons/fa';
import { Link,Button } from '@nextui-org/react';
import { FaPuzzlePiece } from 'react-icons/fa6';
import { Card } from 'flowbite-react';
const tutorials = [
  {
    Icon: FaVideo,
    title: 'Horarios Avanzados',
    description: 'Aprende cómo crear y gestionar el horario de tu escuela, incluyendo la adición de clases, asignación de profesores y configuración de aulas.'
  },
  {
    Icon: FaPuzzlePiece,
    title: 'Programación Avanzada',
    description: 'Explora las funciones avanzadas de Schedulario, como la codificación por colores, el arrastrar y soltar, y los algoritmos de programación inteligente.'
  }
];

export default function TutorialsSection() {
  return (
    <section id="tutorials" className="bg-slate-800 p-6  ">
      <div className="max-w-4xl mx-auto  space-y-12">
        <div className="text-center text-primary-foreground space-y-4">
          <h2 className="text-xl font-bold">Tutoriales Interactivos</h2>
          <p className=" text-lg">
            Ponte en marcha rápidamente con Schedulario a través de nuestros tutoriales interactivos paso a paso.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start place-content-start  gap-4 m-4">
          {tutorials.map(({ Icon, title, description }) => (
            <Card key={title} className='mb-4 w-full '>

            <div  className=" p-6 flex flex-col  gap-4">
              <Icon className="w-10 h-10 text-danger" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className=" ">{description}</p>
              <Button color='danger'>Comenzar Tutorial</Button>
            </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
