
import { Link,Button } from '@nextui-org/react';
import Navbar from './Navbar';
import { GrMenu } from 'react-icons/gr';
import { BiCalendar } from 'react-icons/bi';
export default function Header() {
  return (
    <header className="bg-slate-800 text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <BiCalendar className="w-6 h-6" />
        <span className="text-lg font-bold">Schedulario</span>
      </Link>
      <Navbar />
      <Button variant="ghost" size="icon" className="md:hidden">
        <GrMenu className="w-6 h-6" />
      </Button>
    </header>
  );
}
