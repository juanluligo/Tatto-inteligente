import { useState } from 'react';
import ClientRegistrationModal from './components/ClientRegistrationModal.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ClientLoginPage from './pages/ClientLoginPage.jsx';
import ClientDashboardPage from './pages/ClientDashboardPage.jsx';
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  listarClientes,
  leerClientes,
  guardarClientes,
  obtenerClientePorId,
} from './services/clientes.js';

export default function App() {
  const [clientes, setClientes] = useState(() => leerClientes());
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [authenticatedClient, setAuthenticatedClient] = useState(null);

  async function handleCreateClient(datos) {
    const cliente = await crearCliente(datos, clientes);
    setClientes((current) => {
      const updatedClients = [...current, cliente];
      guardarClientes(updatedClients);
      return updatedClients;
    });
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
    guardarClientes(clientes.map((client) => (
      client.id === id ? updatedClient : client
    )));
    return updatedClient;
  }

  async function handleDeleteClient(id) {
    const inactiveClient = await eliminarCliente(id, clientes);
    setClientes((current) => current.map((client) => (
      client.id === id ? inactiveClient : client
    )));
    guardarClientes(clientes.map((client) => (
      client.id === id ? inactiveClient : client
    )));
    return inactiveClient;
  }

  return (
    <AppLayout
      onScheduleClick={() => setIsRegistrationOpen(true)}
      onClientProcessClick={() => setActivePage('login')}
    >
      {activePage === 'home' && <HomePage />}
      {activePage === 'login' && (
        <ClientLoginPage
          clientes={clientes}
          onBack={() => setActivePage('home')}
          onLogin={(client) => {
            setAuthenticatedClient(client);
            setActivePage('dashboard');
          }}
        />
      )}
      {activePage === 'dashboard' && authenticatedClient && (
        <ClientDashboardPage
          client={authenticatedClient}
          onLogout={() => {
            setAuthenticatedClient(null);
            setActivePage('login');
          }}
        />
      )}
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
