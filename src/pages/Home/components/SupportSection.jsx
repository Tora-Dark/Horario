import { Link,Button } from '@nextui-org/react';
import { HiMail } from 'react-icons/hi';
import { BiWebcam } from 'react-icons/bi';
import { Card } from 'flowbite-react';

const supportOptions = [
  {
    Icon: BiWebcam,
    title: 'Chat en Vivo',
    description: 'Conéctate con nuestro equipo de soporte en tiempo real a través de nuestra función de chat en vivo fácil de usar.'
  },
  {
    Icon: HiMail,
    title: 'Soporte por Correo Electrónico',
    description: 'Envía un ticket de soporte y nuestro equipo responderá rápidamente para abordar tus inquietudes.'
  }
];

export default function SupportSection() {
  return (
    <section id="support" className=" flex p-6 bg-slate-200 bg-blend-color-dodge flex-col">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Soporte Técnico 24/7</h2>
          <p className="text-muted-foreground text-lg">
            Nuestro equipo de soporte dedicado está disponible las 24 horas del día para ayudarte con cualquier pregunta o problema que puedas tener.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start place-content-start  gap-4 m-4">
          {supportOptions.map(({ Icon, title, description }) => (
            <Card key={title} className='mb-4 w-full'>

            <div  className="bp-6 flex flex-col  gap-4">
              <Icon className="w-10 h-10 text-success" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
              <Button color='success'>Obtener Soporte</Button>
            </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
