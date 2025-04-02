import { CacheApiDataType, CacheApiUrlSuffixes } from '../../Common';

export interface ILsCacheApiConnector {
  get(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
  );
  put(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
    requestBody: any,
  );
  delete(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
  );
}
