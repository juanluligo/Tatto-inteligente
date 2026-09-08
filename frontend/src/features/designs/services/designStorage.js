const CLIENTS_KEY = 'clientes';
const DESIGNS_KEY = 'disenos';

const initialClients = [
  { id: 'cliente-001', nombre: 'Juan Camilo', email: 'juan@gmail.com', telefono: '3001234567', estado: 'activo' },
  { id: 'cliente-002', nombre: 'María López', email: 'maria@gmail.com', telefono: '3159876543', estado: 'activo' },
];

function read(key, fallback) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}

export function getClients() {
  const clients = read(CLIENTS_KEY, initialClients);
  if (!localStorage.getItem(CLIENTS_KEY)) localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  return clients;
}

export function createDesign({ clienteId, nombre, categoria, descripcion, imagen }) {
  const design = {
    id: crypto.randomUUID(),
    clienteId,
    nombre,
    descripcion,
    categoria,
    imagen,
    estado: 'activo',
  };
  const designs = read(DESIGNS_KEY, []);
  localStorage.setItem(DESIGNS_KEY, JSON.stringify([...designs, design]));
  return design;
}
