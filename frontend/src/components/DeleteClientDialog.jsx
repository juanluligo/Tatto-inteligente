export default function DeleteClientDialog({ clientName, isDeleting, onCancel, onConfirm }) {
  return (
    <div className="confirm-backdrop" role="presentation">
      <section className="confirm-dialog" aria-modal="true" aria-labelledby="delete-client-title" role="alertdialog">
        <p className="eyebrow">Eliminar cliente</p>
        <h3 id="delete-client-title">¿Está seguro de eliminar a {clientName}?</h3>
        <p>El registro se conservará, pero su estado cambiará a inactivo.</p>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onCancel} disabled={isDeleting}>
            Cancelar
          </button>
          <button className="danger-button" type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Eliminando…' : 'Eliminar'}
          </button>
        </div>
      </section>
    </div>
  );
}
