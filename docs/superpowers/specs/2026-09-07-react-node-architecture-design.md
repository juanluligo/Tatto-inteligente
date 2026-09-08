# Arquitectura React + Node para TattooStudio

## Objetivo

Crear una base de proyecto frontend y backend separada dentro del repositorio actual, aunque el backend no se utilice todavía. Cada subsistema debe tener su propio `package.json`, configuración, dependencias y comando `npm run dev`.

## Decisión

Se utilizará una estructura tipo monorepo simple, sin workspaces ni dependencias compartidas:

```text
TattoStudio/
├── frontend/       # React + Vite + JavaScript
├── backend/        # Node + Express + JavaScript
├── docs/            # Documentación de arquitectura 
└── README.md
```

La separación física y de paquetes permite evolucionar ambos lados de forma independiente y evita acoplar el frontend a una implementación prematura del backend.

## Frontend

`frontend/` será una aplicación React creada con Vite y JavaScript. Su código se organizará por responsabilidad:

- `src/components`: componentes reutilizables.
- `src/pages`: vistas de la aplicación.
- `src/layouts`: estructuras de página.
- `src/services`: integración futura con APIs.
- `src/hooks`: hooks personalizados.
- `src/constants`: constantes y configuración fija del dominio frontend.
- `src/config`: configuración de entorno.
- `src/assets`: recursos estáticos.

Incluirá una pantalla inicial funcional, estilos base, ESLint y variables mediante `.env.example`. El comando `npm run dev` levantará Vite en modo desarrollo.

## Backend

`backend/` será una aplicación Node con Express y JavaScript. Su código se organizará así:

- `src/config`: configuración de entorno.
- `src/controllers`: entrada y salida HTTP.
- `src/routes`: definición de rutas.
- `src/services`: lógica de negocio futura.
- `src/middlewares`: middlewares HTTP futuros.
- `src/utils`: utilidades backend reutilizables.
- `src/app.ts`: composición de Express.
- `src/server.ts`: arranque del proceso.

Solo se implementará la ruta `GET /api/health`, que devuelve un estado simple y verificable. No se agregará base de datos, autenticación ni lógica de tatuajes/citas todavía. El comando `npm run dev` usará `tsx` para recarga durante desarrollo.

## Scripts y configuración

Cada carpeta tendrá scripts locales para desarrollo, compilación y linting. Los archivos `.env.example` documentarán las variables necesarias sin incluir secretos. El README explicará cómo instalar y ejecutar frontend y backend por separado, además de cómo configurar el proxy local del frontend hacia el backend.

## Verificación

La implementación se verificará con:

1. Instalación de dependencias en cada subsistema.
2. Linting.
3. Build de frontend y backend.
4. Prueba automatizada de la ruta de salud del backend.
5. Arranque real de ambos servidores y comprobación de sus respuestas.

## Fuera de alcance

- Conectar el frontend a una API real.
- Persistencia o base de datos.
- Autenticación y autorización.
- Despliegue.
- Paquete compartido entre frontend y backend.
