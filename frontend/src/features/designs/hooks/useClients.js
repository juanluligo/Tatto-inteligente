import { useEffect, useState } from 'react';
import { getClients } from '../services/designStorage.js';

const CLIENTS_UPDATED_EVENT = 'tattoostudio:clients-updated';

export function notifyClientsUpdated() {
  window.dispatchEvent(new Event(CLIENTS_UPDATED_EVENT));
}

export function useClients() {
  const [clients, setClients] = useState(() => getClients());

  useEffect(() => {
    function refreshClients() {
      setClients(getClients());
    }

    window.addEventListener(CLIENTS_UPDATED_EVENT, refreshClients);
    window.addEventListener('storage', refreshClients);
    window.addEventListener('focus', refreshClients);

    const refreshInterval = window.setInterval(refreshClients, 500);

    return () => {
      window.removeEventListener(CLIENTS_UPDATED_EVENT, refreshClients);
      window.removeEventListener('storage', refreshClients);
      window.removeEventListener('focus', refreshClients);
      window.clearInterval(refreshInterval);
    };
  }, []);

  return clients;
}
