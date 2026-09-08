export function getHealthStatus() {
  return {
    status: 'ok',
    service: 'tattoostudio-backend',
    timestamp: new Date().toISOString(),
  };
}
