const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createValidationError(errors) {
  const error = new Error('Revisa los datos del formulario.');
  error.validationErrors = errors;
  return error;
}

/** Simula la creación de un cliente en la API. */
export async function crearCliente(datos, clientesExistentes = []) {
  const nombre = datos.nombre.trim();
  const email = datos.email.trim().toLowerCase();
  const telefono = datos.telefono.trim();
  const errors = {};
  if (!nombre) errors.nombre = 'El nombre es obligatorio.';
  if (!email) errors.email = 'El correo electrónico es obligatorio.';
  else if (!emailPattern.test(email)) errors.email = 'Ingresa un correo electrónico válido.';
  else if (clientesExistentes.some((cliente) => cliente.email.toLowerCase() === email)) {
    errors.email = 'Ya existe un cliente registrado con este correo.';
  }
  if (!telefono) errors.telefono = 'El teléfono es obligatorio.';
  if (Object.keys(errors).length > 0) throw createValidationError(errors);
  await Promise.resolve();
  return {
    id: crypto.randomUUID(),
    nombre,
    email,
    telefono,
    fechaNacimiento: datos.fechaNacimiento || null,
    fechaRegistro: new Date().toISOString(),
    estado: true,
  };
}
