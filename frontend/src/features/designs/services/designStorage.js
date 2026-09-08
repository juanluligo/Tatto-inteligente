const CLIENTS_KEY = 'clientes';
const DESIGNS_KEY = 'disenos';

const initialClients = [
  { id: 'cliente-001', nombre: 'Juan Camilo', email: 'juan@gmail.com', telefono: '3001234567', estado: 'activo' },
  { id: 'cliente-002', nombre: 'María López', email: 'maria@gmail.com', telefono: '3159876543', estado: 'activo' },
  { id: 'cliente-003', nombre: 'Irving Magico', email: 'irving@gmail.com', telefono: '3207904948', estado: 'activo' },
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

export function getDesignsByClient(clienteId) {
  return read(DESIGNS_KEY, []).filter((design) => design.clienteId === clienteId);
}

export function updateDesign(id, changes) {
  const designs = read(DESIGNS_KEY, []);
  const currentDesign = designs.find((design) => design.id === id);

  if (!currentDesign) return null;

  const updatedDesign = {
    ...currentDesign,
    ...changes,
    id: currentDesign.id,
    clienteId: currentDesign.clienteId,
    estado: currentDesign.estado,
  };
  const updatedDesigns = designs.map((design) => (
    design.id === id ? updatedDesign : design
  ));

  localStorage.setItem(DESIGNS_KEY, JSON.stringify(updatedDesigns));
  return updatedDesign;
}

export function deleteDesign(id) {
  const designs = read(DESIGNS_KEY, []);
  const deletedDesign = designs.find((design) => design.id === id);

  if (!deletedDesign) return null;

  const remainingDesigns = designs.filter((design) => design.id !== id);
  localStorage.setItem(DESIGNS_KEY, JSON.stringify(remainingDesigns));

  return deletedDesign;
}
