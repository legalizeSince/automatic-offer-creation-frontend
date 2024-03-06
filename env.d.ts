declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAPS_API_KEY: string;
    }
  }
}

export {};
