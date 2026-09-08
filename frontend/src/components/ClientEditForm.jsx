import { useState } from 'react';

function getInitialForm(client) {
  return {
    nombre: client.nombre,
    email: client.email,
    telefono: client.telefono,
    fechaNacimiento: client.fechaNacimiento || '',
    estado: client.estado,
  };
}

export default function ClientEditForm({ client, onCancel, onSave }) {
  const [form, setForm] = useState(() => getInitialForm(client));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { checked, name, type, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await onSave(form);
    } catch (error) {
      setErrors(error.validationErrors || {
        form: 'No fue posible actualizar el cliente. Inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="client-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="edit-nombre">Nombre completo *</label>
      <input id="edit-nombre" name="nombre" value={form.nombre} onChange={updateField} aria-describedby={errors.nombre ? 'edit-nombre-error' : undefined} aria-invalid={Boolean(errors.nombre)} />
      {errors.nombre && <p className="form-error" id="edit-nombre-error">{errors.nombre}</p>}
      <label htmlFor="edit-email">Correo electrónico *</label>
      <input id="edit-email" name="email" type="email" value={form.email} onChange={updateField} aria-describedby={errors.email ? 'edit-email-error' : undefined} aria-invalid={Boolean(errors.email)} />
      {errors.email && <p className="form-error" id="edit-email-error">{errors.email}</p>}
      <label htmlFor="edit-telefono">Teléfono *</label>
      <input id="edit-telefono" name="telefono" type="tel" value={form.telefono} onChange={updateField} aria-describedby={errors.telefono ? 'edit-telefono-error' : undefined} aria-invalid={Boolean(errors.telefono)} />
      {errors.telefono && <p className="form-error" id="edit-telefono-error">{errors.telefono}</p>}
      <label htmlFor="edit-fechaNacimiento">Fecha de nacimiento <span>(opcional)</span></label>
      <input id="edit-fechaNacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={updateField} />
      <label className="status-control" htmlFor="edit-estado"><input id="edit-estado" name="estado" type="checkbox" checked={form.estado} onChange={updateField} /> Cliente activo</label>
      {errors.form && <p className="form-error form-error-general" role="alert">{errors.form}</p>}
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button><button className="primary-button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Guardando…' : 'Guardar cambios'} <span>→</span></button></div>
    </form>
  );
}
