import { Link,Button } from '@nextui-org/react';

export default function Navbar() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {['Features', 'Tutorials', 'Support'].map((item) => (
        <Link href={`#${item.toLowerCase()}`} key={item} className="hover:underline">
          {item}
        </Link>
      ))}
      <Button variant="secondary">Get Started</Button>
    </nav>
  );
}
