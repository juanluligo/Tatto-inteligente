const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

export async function getHealth() {
  const response = await fetch(`${apiBaseUrl}/health`);
  if (!response.ok) throw new Error('No fue posible conectar con el backend');
  return response.json();
}
