export interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: FormData | string;
  credentials: RequestCredentials;
}
