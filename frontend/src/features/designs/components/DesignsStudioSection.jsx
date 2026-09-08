import { useState } from 'react';
import CreateDesignForm from './CreateDesignForm.jsx';
import DesignsList from './DesignsList.jsx';
import { useClients } from '../hooks/useClients.js';

export default function DesignsStudioSection() {
  const clients = useClients();
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [refreshKey, setRefreshKey] = useState(0);

  function handleDesignCreated() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="designs-studio-section">
      <div className="client-context">
        <label htmlFor="designs-client-filter">Cliente activo</label>
        <select
          id="designs-client-filter"
          value={selectedClientId}
          onChange={(event) => setSelectedClientId(event.target.value)}
        >
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nombre}
            </option>
          ))}
        </select>
      </div>
      <CreateDesignForm
        clients={clients}
        selectedClientId={selectedClientId}
        onClientChange={setSelectedClientId}
        onDesignCreated={handleDesignCreated}
      />
      <DesignsList
        key={`${selectedClientId}-${refreshKey}`}
        clientId={selectedClientId}
      />
    </div>
  );
}
