export default function AppHeader({ onScheduleClick, onClientProcessClick }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="TattooStudio inicio">
        <span className="brand-mark">TS</span>
        <span>TattooStudio</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#estudio">El estudio</a>
        <button className="nav-link-button" type="button" onClick={onClientProcessClick}>Proceso cliente</button>
        <button className="nav-cta" type="button" onClick={onScheduleClick}>Agenda una cita</button>
      </nav>
    </header>
  );
}
