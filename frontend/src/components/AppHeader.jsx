import menuBackground from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012545.png';

export default function AppHeader({ onScheduleClick }) {
  return (
    <header
      className="site-header"
      style={{ '--menu-background': `url(${menuBackground})` }}
    >
      <a className="brand" href="/" aria-label="TattooStudio inicio">
        <span className="brand-mark">TS</span>
        <span>TattooStudio</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#estudio">El estudio</a>
        <a href="#proceso">Proceso cliente</a>
        <button className="nav-cta" type="button" onClick={onScheduleClick}>Agenda una cita</button>
      </nav>
    </header>
  );
}
