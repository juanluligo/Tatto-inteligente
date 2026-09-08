export default function AppHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="TattooStudio inicio">
        <span className="brand-mark">TS</span>
        <span>TattooStudio</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#estudio">El estudio</a>
        <a href="#proceso">Proceso</a>
        <a className="nav-cta" href="#contacto">Agenda una cita</a>
      </nav>
    </header>
  );
}
