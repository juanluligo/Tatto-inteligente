import { useState } from 'react';
import ClientRegistrationModal from './components/ClientRegistrationModal.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  listarClientes,
  obtenerClientePorId,
} from './services/clientes.js';

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  async function handleCreateClient(datos) {
    const cliente = await crearCliente(datos, clientes);
    setClientes((current) => [...current, cliente]);
    return cliente;
  }

  async function handleListClients() {
    return listarClientes(clientes);
  }

  async function handleGetClient(id) {
    return obtenerClientePorId(id, clientes);
  }

  async function handleUpdateClient(id, datos) {
    const updatedClient = await actualizarCliente(id, datos, clientes);
    setClientes((current) => current.map((client) => (
      client.id === id ? updatedClient : client
    )));
    return updatedClient;
  }

  async function handleDeleteClient(id) {
    const inactiveClient = await eliminarCliente(id, clientes);
    setClientes((current) => current.map((client) => (
      client.id === id ? inactiveClient : client
    )));
    return inactiveClient;
  }

  return (
    <AppLayout onScheduleClick={() => setIsRegistrationOpen(true)}>
      <HomePage />
      <ClientRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onCreate={handleCreateClient}
        onDeleteClient={handleDeleteClient}
        onGetClient={handleGetClient}
        onListClients={handleListClients}
        onUpdateClient={handleUpdateClient}
      />
    </AppLayout>
  );
}
