// Declare process env variables globally

declare namespace NodeJS {
  interface ProcessEnv {
    FROM_EMAIL: string;
  }
}
