import { useState } from 'react';
import CreateDesignForm from './CreateDesignForm.jsx';
import DesignsList from './DesignsList.jsx';
import EditDesignModal from './EditDesignModal.jsx';
import { useClients } from '../hooks/useClients.js';
import { deleteDesign } from '../services/designStorage.js';

export default function DesignsStudioSection() {
  const clients = useClients();
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingDesign, setEditingDesign] = useState(null);

  function handleDesignCreated() {
    setRefreshKey((current) => current + 1);
  }

  function handleDesignUpdated() {
    setEditingDesign(null);
    setRefreshKey((current) => current + 1);
  }

  function handleDesignDelete(design) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar el diseño “${design.nombre}”?`,
    );

    if (!confirmed) return;

    deleteDesign(design.id);
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
        onEdit={setEditingDesign}
        onDelete={handleDesignDelete}
      />
      {editingDesign && (
        <EditDesignModal
          design={editingDesign}
          onClose={() => setEditingDesign(null)}
          onUpdated={handleDesignUpdated}
        />
      )}
    </div>
  );
}
