import { useState } from 'react';
import { authenticateClient } from '../services/clientes.js';

const initialForm = {
  email: '',
  telefono: '',
};

export default function ClientLoginPage({ clientes, onBack, onLogin }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const client = authenticateClient(form, clientes);

    if (!client) {
      setError('No encontramos un cliente activo con esos datos. Revisa tu correo y teléfono.');
      return;
    }

    onLogin(client);
  }

  return (
    <main className="client-login-page">
      <button className="back-button" type="button" onClick={onBack}>
        ← Volver al inicio
      </button>
      <section className="client-login-card" aria-labelledby="client-login-title">
        <p className="eyebrow">Proceso cliente · Acceso</p>
        <h1 id="client-login-title">Tu historia continúa aquí.</h1>
        <p className="modal-description">
          Ingresa con el correo y teléfono que usaste al registrarte para agendar tu cita.
        </p>
        {error && <p className="form-error form-error-general" role="alert">{error}</p>}
        <form className="client-login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="tu-correo@ejemplo.com"
            required
          />
          <label htmlFor="login-phone">Teléfono</label>
          <input
            id="login-phone"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={updateField}
            placeholder="300 123 4567"
            required
          />
          <button className="primary-button form-submit" type="submit">
            Entrar a mi panel <span>↗</span>
          </button>
        </form>
      </section>
    </main>
  );
}
