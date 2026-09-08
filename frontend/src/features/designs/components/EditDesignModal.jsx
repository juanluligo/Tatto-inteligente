import { useState } from 'react';
import { updateDesign } from '../services/designStorage.js';

const categories = [
  'Japonés',
  'Realista',
  'Minimalista',
  'Geométrico',
  'Blackwork',
];

export default function EditDesignModal({ design, onClose, onUpdated }) {
  const [form, setForm] = useState(design);

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
    const updatedDesign = updateDesign(design.id, {
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      imagen: form.imagen,
    });
    onUpdated(updatedDesign);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="edit-design-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-design-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="form-heading">
          <span>03</span>
          <h3 id="edit-design-title">Editar diseño</h3>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar edición">×</button>
        </div>

        <form className="design-form edit-form" onSubmit={handleSubmit}>
          <label>
            Nombre del diseño
            <input name="nombre" value={form.nombre} onChange={updateField} required />
          </label>

          <label>
            Categoría
            <select name="categoria" value={form.categoria} onChange={updateField}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            Descripción
            <textarea name="descripcion" value={form.descripcion} onChange={updateField} rows="3" required />
          </label>

          <label className="file-field">
            Imagen
            <input name="imagen" type="file" accept="image/*" onChange={handleImage} />
            <span>{form.imagen ? 'Imagen seleccionada ✓' : 'Seleccionar imagen'}</span>
          </label>

          <div className="form-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancelar</button>
            <button className="primary-button" type="submit">Guardar cambios <span>↗</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
