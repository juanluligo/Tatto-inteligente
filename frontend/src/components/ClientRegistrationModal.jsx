import { useState } from 'react';
import ClientListPanel from './ClientListPanel.jsx';

const initialForm = { nombre: '', email: '', telefono: '', fechaNacimiento: '' };

export default function ClientRegistrationModal({
  isOpen,
  onClose,
  onCreate,
  onDeleteClient,
  onGetClient,
  onListClients,
  onUpdateClient,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeView, setActiveView] = useState('registro');
  if (!isOpen) return null;

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSuccess('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess('');

    try {
      await onCreate(form);
      setForm(initialForm);
      setSuccess('Cliente registrado correctamente. Ya puedes continuar con la cita.');
    } catch (error) {
      setErrors(error.validationErrors || {
        form: 'No fue posible registrar el cliente. Inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="client-modal"
        aria-labelledby="client-modal-title"
        aria-modal="true"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="Cerrar formulario" onClick={onClose}>
          ×
        </button>
        <div className="agenda-tabs" role="tablist" aria-label="Agenda de citas">
          <button
            className={activeView === 'registro' ? 'agenda-tab is-active' : 'agenda-tab'}
            role="tab"
            type="button"
            aria-selected={activeView === 'registro'}
            onClick={() => setActiveView('registro')}
          >
            Registrar
          </button>
          <button
            className={activeView === 'clientes' ? 'agenda-tab is-active' : 'agenda-tab'}
            role="tab"
            type="button"
            aria-selected={activeView === 'clientes'}
            onClick={() => setActiveView('clientes')}
          >
            Clientes
          </button>
        </div>
        {activeView === 'clientes' && (
          <ClientListPanel
            onGetClient={onGetClient}
            onListClients={onListClients}
            onUpdateClient={onUpdateClient}
            onDeleteClient={onDeleteClient}
          />
        )}
        {activeView === 'registro' && <>
          <p className="eyebrow">Agenda una cita</p>
          <h2 id="client-modal-title">Primero, cuéntanos sobre ti.</h2>
          <p className="modal-description">
            Registra tus datos para iniciar la reserva. Los campos marcados con * son obligatorios.
          </p>
          {success && <p className="form-success" role="status">{success}</p>}
          {errors.form && <p className="form-error form-error-general" role="alert">{errors.form}</p>}
          <form className="client-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo *</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={updateField} aria-describedby={errors.nombre ? 'nombre-error' : undefined} aria-invalid={Boolean(errors.nombre)} />
          {errors.nombre && <p className="form-error" id="nombre-error">{errors.nombre}</p>}
          <label htmlFor="email">Correo electrónico *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={updateField} aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="form-error" id="email-error">{errors.email}</p>}
          <label htmlFor="telefono">Teléfono *</label>
          <input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={updateField} aria-describedby={errors.telefono ? 'telefono-error' : undefined} aria-invalid={Boolean(errors.telefono)} />
          {errors.telefono && <p className="form-error" id="telefono-error">{errors.telefono}</p>}
          <label htmlFor="fechaNacimiento">Fecha de nacimiento <span>(opcional)</span></label>
          <input id="fechaNacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={updateField} />
          <button className="primary-button form-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Registrando…' : 'Registrar cliente'} <span>→</span>
          </button>
          </form>
        </>}
      </section>
    </div>
  );
}
