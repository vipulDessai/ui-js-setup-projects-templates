export interface ICacheSet {
  add(key: string | number, value: any): Promise<number>;
  get(key: string | number): Promise<string[]>;
  exists(key: string | number, value: any): Promise<boolean>;
  delete(key: string | number, value: any): Promise<number>;
}
