import { useEffect, useMemo, useState } from 'react';
import ClientEditForm from './ClientEditForm.jsx';
import DeleteClientDialog from './DeleteClientDialog.jsx';

function formatDate(value, options) {
  if (!value) return 'No registrada';
  return new Intl.DateTimeFormat('es-CO', options).format(new Date(value));
}

export default function ClientListPanel({
  onDeleteClient,
  onGetClient,
  onListClients,
  onUpdateClient,
}) {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [clientPendingDeletion, setClientPendingDeletion] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadClients() {
      setIsLoading(true);
      setError('');

      try {
        const registeredClients = await onListClients();
        if (isCurrent) setClientes(registeredClients);
      } catch {
        if (isCurrent) setError('No fue posible consultar los clientes.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadClients();
    return () => {
      isCurrent = false;
    };
  }, [onListClients]);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es-CO');
    if (!normalizedSearch) return clientes;
    return clientes.filter((cliente) => (
      cliente.nombre.toLocaleLowerCase('es-CO').includes(normalizedSearch)
    ));
  }, [clientes, search]);

  async function handleSelectClient(id) {
    setError('');

    try {
      const client = await onGetClient(id);
      if (!client) throw new Error('Cliente no encontrado');
      setSelectedClient(client);
      setSuccess('');
    } catch {
      setError('No fue posible cargar el detalle del cliente.');
    }
  }

  async function handleUpdateClient(datos) {
    const updatedClient = await onUpdateClient(selectedClient.id, datos);
    setSelectedClient(updatedClient);
    setClientes((current) => current.map((client) => (
      client.id === updatedClient.id ? updatedClient : client
    )));
    setIsEditing(false);
    setSuccess('Cliente actualizado correctamente.');
  }

  async function handleDeleteClient() {
    if (!clientPendingDeletion) return;

    setIsDeleting(true);
    setError('');

    try {
      const inactiveClient = await onDeleteClient(clientPendingDeletion.id);
      setSelectedClient(inactiveClient);
      setClientes((current) => current.map((client) => (
        client.id === inactiveClient.id ? inactiveClient : client
      )));
      setClientPendingDeletion(null);
      setSuccess('Cliente marcado como inactivo correctamente.');
    } catch {
      setError('No fue posible eliminar el cliente. Inténtalo de nuevo.');
      setClientPendingDeletion(null);
    } finally {
      setIsDeleting(false);
    }
  }

  if (selectedClient) {
    return (
      <section className="client-panel" aria-labelledby="client-detail-title">
        {clientPendingDeletion && (
          <DeleteClientDialog
            clientName={clientPendingDeletion.nombre}
            isDeleting={isDeleting}
            onCancel={() => setClientPendingDeletion(null)}
            onConfirm={handleDeleteClient}
          />
        )}
        {!isEditing && <button className="back-button" type="button" onClick={() => setSelectedClient(null)}>← Volver a clientes</button>}
        {isEditing && <button className="back-button" type="button" onClick={() => setIsEditing(false)}>← Cancelar edición</button>}
        {isEditing && <>
          <p className="eyebrow">Editar cliente</p>
          <h2 id="client-detail-title">Actualiza sus datos.</h2>
          <ClientEditForm client={selectedClient} onCancel={() => setIsEditing(false)} onSave={handleUpdateClient} />
        </>}
        {!isEditing && <>
        <p className="eyebrow">Detalle de cliente</p>
        <h2 id="client-detail-title">{selectedClient.nombre}</h2>
        <span className={`status-badge ${selectedClient.estado ? 'status-active' : 'status-inactive'}`}>
          {selectedClient.estado ? 'Activo' : 'Inactivo'}
        </span>
        <dl className="client-detail-list">
          <div>
            <dt>Correo electrónico</dt>
            <dd>{selectedClient.email}</dd>
          </div>
          <div>
            <dt>Teléfono</dt>
            <dd>{selectedClient.telefono}</dd>
          </div>
          <div>
            <dt>Fecha de nacimiento</dt>
            <dd>{formatDate(selectedClient.fechaNacimiento, { dateStyle: 'long' })}</dd>
          </div>
          <div>
            <dt>Fecha de registro</dt>
            <dd>{formatDate(selectedClient.fechaRegistro, { dateStyle: 'long', timeStyle: 'short' })}</dd>
          </div>
        </dl>
        {success && <p className="form-success" role="status">{success}</p>}
        {error && <p className="form-error form-error-general" role="alert">{error}</p>}
        <div className="detail-actions">
          <button className="primary-button edit-button" type="button" onClick={() => setIsEditing(true)}>
            Editar cliente <span>→</span>
          </button>
          {selectedClient.estado && (
            <button className="danger-button" type="button" onClick={() => setClientPendingDeletion(selectedClient)}>
              Eliminar
            </button>
          )}
        </div>
        </>}
      </section>
    );
  }

  return (
    <section className="client-panel" aria-labelledby="clients-title">
      <p className="eyebrow">Clientes</p>
      <h2 id="clients-title">Tu comunidad.</h2>
      <label className="search-label" htmlFor="client-search">Buscar por nombre</label>
      <input
        id="client-search"
        className="client-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Ej. Juan Camilo"
      />
      {error && <p className="form-error form-error-general" role="alert">{error}</p>}
      {isLoading && <p className="empty-clients">Cargando clientes…</p>}
      {!isLoading && !error && filteredClients.length === 0 && (
        <p className="empty-clients">
          {clientes.length ? 'No hay coincidencias para esta búsqueda.' : 'Aún no has registrado clientes.'}
        </p>
      )}
      {!isLoading && filteredClients.length > 0 && (
        <ul className="client-list">
          {filteredClients.map((cliente) => (
            <li key={cliente.id}>
              <button type="button" onClick={() => handleSelectClient(cliente.id)}>
                <span className="client-list-name">{cliente.nombre}</span>
                <span>{cliente.email}</span>
                <span>{cliente.telefono}</span>
                <span className={`status-badge ${cliente.estado ? 'status-active' : 'status-inactive'}`}>
                  {cliente.estado ? 'Activo' : 'Inactivo'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
