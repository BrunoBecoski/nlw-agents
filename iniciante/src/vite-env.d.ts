/// <reference types="vite/client" />

type ViteTypeOptions = {};

interface ImportMetaEnv {
	readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
