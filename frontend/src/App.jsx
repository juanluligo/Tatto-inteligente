import { useState } from 'react';
import ClientRegistrationModal from './components/ClientRegistrationModal.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import { crearCliente } from './services/clientes.js';

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  async function handleCreateClient(datos) {
    const cliente = await crearCliente(datos, clientes);
    setClientes((current) => [...current, cliente]);
    return cliente;
  }

  return (
    <AppLayout onScheduleClick={() => setIsRegistrationOpen(true)}>
      <HomePage />
      <ClientRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onCreate={handleCreateClient}
      />
    </AppLayout>
  );
}
