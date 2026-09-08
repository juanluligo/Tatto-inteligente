# React + Node Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una base funcional de TattooStudio con frontend React y backend Node separados, ambos ejecutables mediante su propio `npm run dev`.

**Architecture:** El frontend y el backend vivirán en carpetas independientes, con `package.json`, configuración ESLint y variables de entorno propias. El frontend será una app React con Vite y JavaScript; el backend será Express con JavaScript y una ruta mínima `/api/health`.

**Tech Stack:** React, Vite, JavaScript, Node.js, Express, Vitest, Supertest, ESLint.

**Spec:** `docs/superpowers/specs/2026-09-07-react-node-architecture-design.md`

## Global Constraints

- Cada subsistema debe tener su propio `package.json` y comando `npm run dev`.
- No habrá workspaces ni dependencias compartidas.
- El backend solo implementará `GET /api/health`.
- No se agregarán base de datos, autenticación ni despliegue.

### Task 1: Crear la aplicación frontend

**Files:**
- Create: `frontend/package.json`, `frontend/index.html`, `frontend/vite.config.js`, `frontend/eslint.config.js`
- Create: `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/index.css`
- Create: `frontend/src/components/AppHeader.jsx`, `frontend/src/pages/HomePage.jsx`, `frontend/src/layouts/AppLayout.jsx`
- Create: `frontend/src/services/api.js`, `frontend/src/hooks/useApi.js`, `frontend/src/constants/app.js`, `frontend/src/assets/.gitkeep`, `frontend/.env.example`

- [ ] **Step 1:** Crear la configuración Vite/React y los scripts `dev`, `build`, `lint` y `preview`.
- [ ] **Step 2:** Crear la composición de layout, header y página inicial funcional.
- [ ] **Step 3:** Crear los módulos base de servicios, hooks, constantes y assets.
- [ ] **Step 4:** Ejecutar `npm install`, `npm run lint` y `npm run build` dentro de `frontend`.

### Task 2: Crear el backend independiente

**Files:**
- Create: `backend/package.json`, `backend/eslint.config.js`, `backend/.env.example`
- Create: `backend/src/config/env.js`, `backend/src/controllers/health.controller.js`, `backend/src/routes/health.routes.js`
- Create: `backend/src/services/health.service.js`, `backend/src/middlewares/error.middleware.js`
- Create: `backend/src/app.js`, `backend/src/server.js`, `backend/src/utils/.gitkeep`
- Create: `backend/tests/health.test.js`

- [ ] **Step 1:** Escribir la prueba de `GET /api/health` con Supertest y ejecutar Vitest para confirmar el fallo inicial.
- [ ] **Step 2:** Implementar configuración, servicio, controlador, ruta, middleware y aplicación Express mínimos.
- [ ] **Step 3:** Añadir el arranque con `node --watch`, scripts `dev`, `start`, `lint` y `test`.
- [ ] **Step 4:** Ejecutar `npm install`, prueba, lint y arranque del backend.

### Task 3: Documentar ejecución y verificar integración local

**Files:**
- Create: `README.md`
- Modify: `frontend/vite.config.js`

- [ ] **Step 1:** Configurar proxy `/api` del frontend al backend local.
- [ ] **Step 2:** Documentar instalación y ejecución independiente de ambas carpetas.
- [ ] **Step 3:** Arrancar ambos servidores, consultar la página frontend y `/api/health`, y detener los procesos.

