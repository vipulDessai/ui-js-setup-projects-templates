import { AxiosInstance } from 'axios';

export class LsCacheApiConnector {
  private apiAdaptor: AxiosInstance;
  private cacheApiBaseUrl: string;
  get: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(cacheAppToken: string, cacheAppRegion: string) {
    this.get = jest.fn();
    this.put = jest.fn();
    this.delete = jest.fn();
  }
}
