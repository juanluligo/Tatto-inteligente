import { useMemo } from 'react';
import { getDesignsByClient } from '../features/designs/services/designStorage.js';
import { appointments } from '../features/client-panel/data/appointments.js';
import { tattooArtists } from '../features/client-panel/data/tattooArtists.js';

export default function ClientDashboardPage({ client, onLogout }) {
  const designs = useMemo(() => getDesignsByClient(client.id), [client.id]);

  return (
    <main className="client-dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          <span className="brand-mark">TS</span>
          <span>TattooStudio</span>
        </a>
        <nav className="dashboard-nav" aria-label="Navegación del panel">
          <a className="dashboard-nav-active" href="#dashboard">Dashboard</a>
          <a href="#dashboard-designs">Mis diseños</a>
          <a href="#dashboard-appointments">Mis citas</a>
          <a href="#dashboard-artists">Tatuadores</a>
        </nav>
        <button className="dashboard-logout" type="button" onClick={onLogout}>Cerrar sesión</button>
      </aside>

      <section className="dashboard-content" id="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Panel personal</p>
            <h1>Hola, {client.nombre.split(' ')[0]} <br></br> <span aria-hidden="true">Bienvenido</span></h1>
          </div>
          <div className="dashboard-user"> {client.nombre}</div> 
        </header>

        <div className="dashboard-summary">
          <article><span>Mis diseños</span><strong>{designs.length}</strong><small>Piezas guardadas</small></article>
          <article><span>Próxima cita</span><strong>{appointments[0]?.fecha || 'Sin citas'}</strong><small>{appointments[0]?.hora || 'Agenda cuando quieras'}</small></article>
        </div>

        <section className="dashboard-section" id="dashboard-designs">
          <div className="dashboard-section-heading"><p className="eyebrow">01 / Colección</p><h2>Mis diseños</h2></div>
          {designs.length === 0 ? (
            <div className="dashboard-empty">Aún no tienes diseños guardados.</div>
          ) : (
            <div className="dashboard-designs-grid">
              {designs.map((design) => (
                <article className="dashboard-design-card" key={design.id}>
                  <div className="dashboard-design-image">
                    {design.imagen ? <img src={design.imagen} alt={`Diseño ${design.nombre}`} /> : <span aria-hidden="true">✳</span>}
                  </div>
                  <p className="design-category">{design.categoria}</p>
                  <h3>{design.nombre}</h3>
                  <p>{design.descripcion}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="dashboard-columns">
          <section className="dashboard-section" id="dashboard-appointments">
            <p className="eyebrow">02 / Agenda</p>
            <h2>Mis citas</h2>
            {appointments.map((appointment) => (
              <article className="appointment-card" key={appointment.id}>
                <strong>{appointment.fecha}</strong>
                <div><h3>{appointment.tatuador}</h3><p>{appointment.hora}</p></div>
                <span>{appointment.estado}</span>
              </article>
            ))}
          </section>
          <section className="dashboard-section" id="dashboard-artists">
            <p className="eyebrow">03 / El equipo</p>
            <h2>Mis tatuadores</h2>
            <div className="artists-list">
              {tattooArtists.map((artist) => (
                <article className="artist-card" key={artist.id}>
                  <div className="artist-avatar">{artist.nombre.charAt(0)}</div>
                  <div><h3>{artist.nombre}</h3><p>Especialidad: {artist.especialidad}</p></div>
                  <strong>⭐ {artist.rating}</strong>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
