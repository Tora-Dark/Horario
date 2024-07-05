import { Button } from "@nextui-org/button";

export default function MainSection() {
  return (
    <section className="bg-slate-800 container mx-auto px-8 md:py-12 py-8 flex flex-col text-primary-foreground">
      <div className="container mx-auto px-8 md:py-12 py-8 flex flex-row">
        <div className="container mx-auto px-8 md:py-12 py-8 flex flex-col">
          <h1 className="text-4xl font-bold">Simplify Your School Schedules</h1>
          <p className="text-lg">
            Schedulario is the ultimate solution for creating and managing teacher schedules in educational
            institutions. With its intuitive interface and powerful features, you can effortlessly organize your
            school's timetable and optimize resource utilization.
          </p>
          <div className="flex gap-4">
            <Button color="light">Get Started</Button>
            <Button color="gray">Learn More</Button>
          </div>
        </div>
        <div>
          <img
            src="./imgs/WhatsApp Image 2024-06-30 at 10.45.48 AM.jpeg"
            width={600}
            height={400}
            alt="Schedulario Dashboard"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
