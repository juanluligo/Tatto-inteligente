# TattooStudio

Proyecto separado en dos aplicaciones independientes:

```text
frontend/  React + Vite + JavaScript
backend/   Node + Express + JavaScript
```

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

Comandos disponibles:

- `npm run dev`: servidor de desarrollo con Vite.
- `npm run build`: compilación de producción.
- `npm run lint`: revisión de código.
- `npm run preview`: vista previa de la compilación.

## Backend

En otra terminal:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

La API estará disponible en `http://localhost:3000`.

Ruta inicial:

```text
GET http://localhost:3000/api/health
```

Comandos disponibles:

- `npm run dev`: servidor Node con reinicio automático.
- `npm start`: servidor Node normal.
- `npm test`: pruebas automatizadas.
- `npm run lint`: revisión de código.

El frontend ya tiene configurado un proxy para enviar `/api` hacia el backend local. Las aplicaciones no comparten dependencias ni código para conservar la separación y facilitar su evolución futura.
