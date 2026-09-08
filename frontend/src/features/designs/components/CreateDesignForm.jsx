import { useState } from 'react';
import { createDesign } from '../services/designStorage.js';

const categories = [
  'Japonés',
  'Realista',
  'Minimalista',
  'Geométrico',
  'Blackwork',
];

const initialForm = {
  clienteId: '',
  nombre: '',
  categoria: categories[0],
  descripcion: '',
  imagen: '',
};

export default function CreateDesignForm({
  clients,
  selectedClientId,
  onClientChange,
  onDesignCreated,
}) {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    clienteId: selectedClientId,
  }));
  const [savedDesign, setSavedDesign] = useState(null);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        imagen: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const design = createDesign({ ...form, clienteId: selectedClientId });
    setSavedDesign(design);
    onDesignCreated(design);
    setForm((current) => ({
      ...initialForm,
      clienteId: current.clienteId,
    }));
  }

  return (
    <div className="create-design-layout">
      <div className="studio-copy">
        <p className="eyebrow">El estudio · Diseños</p>
        <h2>Una idea empieza con una conversación.</h2>
        <p className="muted-copy">Registra una nueva pieza y asígnala al cliente que la llevará en la piel.</p>
        {savedDesign && (
          <p className="save-message" role="status">
            ✓ Diseño “{savedDesign.nombre}” guardado correctamente.
          </p>
        )}
      </div>
      <form className="design-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <span>01</span>
          <h3>Nuevo diseño</h3>
        </div>

        <label>
          Cliente
          <select
            name="clienteId"
            value={selectedClientId}
            onChange={(event) => onClientChange(event.target.value)}
            required
          >
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Nombre del diseño
          <input
            name="nombre"
            value={form.nombre}
            onChange={updateField}
            placeholder="Ej. Dragón japonés"
            required
          />
        </label>

        <label>
          Categoría
          <select
            name="categoria"
            value={form.categoria}
            onChange={updateField}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={updateField}
            placeholder="Describe la idea del diseño"
            rows="3"
            required
          />
        </label>

        <label className="file-field">
          Imagen
          <input
            name="imagen"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
          <span>
            {form.imagen ? 'Imagen seleccionada ✓' : 'Seleccionar imagen'}
          </span>
        </label>

        <div className="form-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={() => setForm((current) => ({
              ...initialForm,
              clienteId: current.clienteId,
            }))}
          >
            Cancelar
          </button>
          <button className="primary-button" type="submit">
            Guardar diseño <span>↗</span>
          </button>
        </div>
      </form>
    </div>
  );
}
