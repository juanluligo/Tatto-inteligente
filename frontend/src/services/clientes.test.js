import { describe, expect, it } from 'vitest';
import { authenticateClient } from './clientes.js';

const client = {
  id: 'cliente-001',
  nombre: 'Juan Camilo',
  email: 'juan@gmail.com',
  telefono: '3001234567',
  estado: true,
};

describe('client authentication', () => {
  it('returns the active client when email and phone match', () => {
    expect(authenticateClient({ email: ' JUAN@GMAIL.COM ', telefono: '3001234567' }, [client]))
      .toEqual(client);
  });

  it('returns null when the credentials do not match an active client', () => {
    expect(authenticateClient({ email: 'otro@gmail.com', telefono: '3001234567' }, [client]))
      .toBeNull();
  });
});
