# Nelau 

## Descripción del Proyecto

Nelau es una aplicación frontend desarrollada con React que utiliza Vite como herramienta de construcción. La aplicación implementa TailwindCSS para el diseño de la interfaz de usuario y Firebase para servicios de backend como autenticación y base de datos.

## Requisitos Previos

Para ejecutar este proyecto, necesitarás:

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn como gestor de paquetes

## Instrucciones de Instalación 

1. Clona este repositorio en tu máquina local:
   ```
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias del frontend:
   ```
   cd nelau/frontend
   npm install
   ```

3. Configura el archivo de variables de entorno (ver sección de Variables de Entorno).

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Scripts Disponibles

En el directorio `frontend`, puedes ejecutar:

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run preview` - Previsualiza la versión de producción localmente

## Estructura del Proyecto

```
nelau/
├── frontend/            # Aplicación React
│   ├── public/          # Archivos estáticos
│   ├── src/             # Código fuente
│   ├── .env             # Variables de entorno (no incluido en git)
│   ├── index.html       # Punto de entrada HTML
│   ├── package.json     # Dependencias y scripts
│   └── vite.config.js   # Configuración de Vite
├── .gitignore           # Archivos ignorados por git
└── README.md            # Este archivo
```

## Variables de Entorno

El proyecto requiere un archivo `.env` en la carpeta `frontend/` con las siguientes variables:

```
# Firebase configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuario
- [Vite](https://vitejs.dev/) - Herramienta de construcción frontend
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Firebase](https://firebase.google.com/) - Plataforma de desarrollo de aplicaciones
- [ESLint](https://eslint.org/) - Herramienta de análisis de código
