/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly DB_PASSWORD: string;
    readonly PUBLIC_POKEAPI: string;
    // 更多环境变量…
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }