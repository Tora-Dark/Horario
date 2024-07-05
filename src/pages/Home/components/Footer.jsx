export default function Footer() {
  return (
    <footer className="bg-slate-800 py-6 text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Schedulario. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
