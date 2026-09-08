import { getDesignsByClient } from '../services/designStorage.js';

export default function DesignsList({ clientId, onEdit }) {
  const designs = getDesignsByClient(clientId);

  return (
    <section className="designs-list" aria-labelledby="my-designs-title">
      <div className="designs-list-heading">
        <div>
          <p className="eyebrow">02 / Diseños guardados</p>
          <h3 id="my-designs-title">Mis diseños</h3>
        </div>
        <span className="design-count">
          {designs.length} {designs.length === 1 ? 'pieza' : 'piezas'}
        </span>
      </div>

      {designs.length === 0 ? (
        <div className="empty-designs">
          <span className="empty-mark">✳</span>
          <p>Este cliente todavía no tiene diseños guardados.</p>
        </div>
      ) : (
        <div className="designs-grid">
          {designs.map((design) => (
            <article className="design-card" key={design.id}>
              <div className="design-card-image">
                {design.imagen ? (
                  <img src={design.imagen} alt={`Referencia de ${design.nombre}`} />
                ) : (
                  <span aria-hidden="true">✳</span>
                )}
              </div>
              <div className="design-card-content">
                <p className="design-category">{design.categoria}</p>
                <h4>{design.nombre}</h4>
                <p>{design.descripcion}</p>
                <button className="edit-design-button" type="button" onClick={() => onEdit(design)}>
                  Editar diseño ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
