import { Link, Button } from "@nextui-org/react";

export default function HeroSection() {
  return (
    <section className="bg-slate-200 h-full py-4 px-6 items-center justify-center place-content-center shadow-slate-900 shadow-lg text-foreground">
      <div className="  flex md:flex-row flex-col gap-8 m-5 place-content-center justify-center items-center">
        <div className="space-y-4 flex flex-col  w-full  gap-4">
          <h1 className="text-2xl font-bold">Simplify Your School Schedules</h1>
          <p className="text-lg">
            Schedulario es la solución definitiva para crear y gestionar
            horarios de profesores en instituciones educativas. Con su interfaz
            intuitiva y funciones poderosas, puedes organizar sin esfuerzo el
            horario de tu escuela y optimizar la utilización de recursos.
          </p>
          <div className="flex gap-4 mb-5 ">
            <Button color="secondary" variant="shadow">
              Get Started
            </Button>
            <Button color="secondary" variant="faded">
              Learn More
            </Button>
          </div>
        </div>
        <div className=" h-full w-full ">
          <img
            src="./imgs/WhatsApp Image 2024-06-30 at 10.45.48 AM.jpeg"
            alt="Schedulario Dashboard"
            className="rounded-lg p-10 shadow-slate-950 shadow-sm w-full  "
          />
        </div>
      </div>
    </section>
  );
}
