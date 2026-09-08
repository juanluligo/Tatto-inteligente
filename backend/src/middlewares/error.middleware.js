export function notFound(_request, response) {
  response.status(404).json({ error: 'Ruta no encontrada' });
}

export function errorHandler(error, _request, response, next) {
  void next;
  console.error(error);
  response.status(500).json({ error: 'Error interno del servidor' });
}
