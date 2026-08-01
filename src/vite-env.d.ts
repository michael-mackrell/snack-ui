/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the Snack Service API (see @server in the TypeSpec). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
