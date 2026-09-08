import { beforeEach, describe, expect, it } from 'vitest';
import {
  createDesign,
  getClients,
  getDesignsByClient,
  updateDesign,
} from './designStorage.js';

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

  it('returns only the designs that belong to the requested client', () => {
    localStorage.setItem('disenos', JSON.stringify([
      { id: 'diseno-001', clienteId: 'cliente-001', nombre: 'Dragón' },
      { id: 'diseno-002', clienteId: 'cliente-002', nombre: 'Rosa' },
    ]));

    expect(getDesignsByClient('cliente-001')).toEqual([
      { id: 'diseno-001', clienteId: 'cliente-001', nombre: 'Dragón' },
    ]);
  });

  it('updates a design without changing its identity or owner', () => {
    localStorage.setItem('disenos', JSON.stringify([
      {
        id: 'diseno-001',
        clienteId: 'cliente-001',
        nombre: 'Dragón',
        categoria: 'Japonés',
        descripcion: 'Boceto inicial',
        imagen: '',
        estado: 'activo',
      },
    ]));

    const updatedDesign = updateDesign('diseno-001', {
      nombre: 'Dragón japonés',
      descripcion: 'Diseño para brazo completo',
    });

    expect(updatedDesign).toMatchObject({
      id: 'diseno-001',
      clienteId: 'cliente-001',
      nombre: 'Dragón japonés',
      descripcion: 'Diseño para brazo completo',
      estado: 'activo',
    });
  });
});
