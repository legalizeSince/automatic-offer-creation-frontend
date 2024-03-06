declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAPS_API_KEY: string;
    }
  }
}

export {};
