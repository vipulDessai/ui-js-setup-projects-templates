export interface ICacheInfo {
  getMemory(key: string | number): Promise<number>;
  getType(key: string | number): Promise<string>;
}
