import { beforeEach, describe, expect, it } from 'vitest';
import { createDesign, getClients } from './designStorage.js';

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

describe('design storage', () => {
  beforeEach(() => {
    globalThis.localStorage = createMemoryStorage();
  });

  it('seeds clients and stores a design linked to the selected client', () => {
    const clients = getClients();
    const design = createDesign({
      clienteId: clients[0].id,
      nombre: 'Dragón japonés',
      categoria: 'Japonés',
      descripcion: 'Diseño para brazo completo',
      imagen: 'data:image/png;base64,preview',
    });

    expect(design).toMatchObject({
      clienteId: clients[0].id,
      nombre: 'Dragón japonés',
      estado: 'activo',
    });
    expect(JSON.parse(localStorage.getItem('disenos'))).toContainEqual(design);
  });
});
