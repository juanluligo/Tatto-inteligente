const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CLIENTS_STORAGE_KEY = 'clientes';

const defaultClients = [
  {
    id: 'cliente-001',
    nombre: 'Juan Camilo',
    email: 'juan@gmail.com',
    telefono: '3001234567',
    fechaNacimiento: '2007-06-15',
    estado: true,
  },
  {
    id: 'cliente-002',
    nombre: 'María López',
    email: 'maria@gmail.com',
    telefono: '3159876543',
    fechaNacimiento: '2005-03-10',
    estado: true,
  },
  {
    id: 'cliente-003',
    nombre: 'Irving Magico',
    email: 'irving@gmail.com',
    telefono: '3207904948',
    fechaNacimiento: null,
    estado: true,
  },
];

export function leerClientes() {
  if (typeof localStorage === 'undefined') return [];

  const storedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);
  if (storedClients) return JSON.parse(storedClients);

  guardarClientes(defaultClients);
  return defaultClients;
}

export function guardarClientes(clientes) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clientes));
  }
}

function createValidationError(errors) {
  const error = new Error('Revisa los datos del formulario.');
  error.validationErrors = errors;
  return error;
}

function validateClientData(datos, clientesExistentes, currentClientId = null) {
  const nombre = datos.nombre.trim();
  const email = datos.email.trim().toLowerCase();
  const telefono = datos.telefono.trim();
  const errors = {};

  if (!nombre) errors.nombre = 'El nombre es obligatorio.';
  if (!email) errors.email = 'El correo electrónico es obligatorio.';
  else if (!emailPattern.test(email)) errors.email = 'Ingresa un correo electrónico válido.';
  else if (clientesExistentes.some((cliente) => (
    cliente.id !== currentClientId && cliente.email.toLowerCase() === email
  ))) {
    errors.email = 'Ya existe un cliente registrado con este correo.';
  }
  if (!telefono) errors.telefono = 'El teléfono es obligatorio.';
  if (Object.keys(errors).length > 0) throw createValidationError(errors);

  return { nombre, email, telefono };
}

/** Simula la creación de un cliente en la API. */
export async function crearCliente(datos, clientesExistentes = []) {
  const { nombre, email, telefono } = validateClientData(datos, clientesExistentes);
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

/** Simula la actualización de un cliente en la API. */
export async function actualizarCliente(id, datos, clientesExistentes = []) {
  const existingClient = clientesExistentes.find((cliente) => cliente.id === id);
  if (!existingClient) throw new Error('Cliente no encontrado.');

  const { nombre, email, telefono } = validateClientData(datos, clientesExistentes, id);
  await Promise.resolve();

  return {
    ...existingClient,
    nombre,
    email,
    telefono,
    fechaNacimiento: datos.fechaNacimiento || null,
    estado: Boolean(datos.estado),
  };
}

/** Simula la eliminación lógica de un cliente en la API. */
export async function eliminarCliente(id, clientesExistentes = []) {
  const existingClient = clientesExistentes.find((cliente) => cliente.id === id);
  if (!existingClient) throw new Error('Cliente no encontrado.');

  await Promise.resolve();

  return {
    ...existingClient,
    estado: false,
  };
}

/** Simula la consulta de clientes en la API. */
export async function listarClientes(clientes = []) {
  await Promise.resolve();
  return [...clientes];
}

/** Simula la consulta de un cliente por id en la API. */
export async function obtenerClientePorId(id, clientes = []) {
  await Promise.resolve();
  return clientes.find((cliente) => cliente.id === id) || null;
}

export function authenticateClient(datos, clientes = leerClientes()) {
  const email = datos.email.trim().toLowerCase();
  const telefono = datos.telefono.trim();

  return clientes.find((cliente) => (
    cliente.estado !== false
    && cliente.estado !== 'inactivo'
    && cliente.email.toLowerCase() === email
    && cliente.telefono === telefono
  )) || null;
}
