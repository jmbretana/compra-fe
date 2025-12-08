/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_KEY: string; // Define aquí tus variables de entorno
  // Agrega otras variables de entorno si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
