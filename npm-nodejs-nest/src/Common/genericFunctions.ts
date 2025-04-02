import { cacheApiPrefix, cacheApiReqPayloadAttributes } from './';

export enum CacheApiDataType {
  ITEMS = 'item',
  SET = 'set',
  HASHSET = 'hashset',
  INFO = 'info',
}

export enum CacheApiUrlSuffixes {
  GET = 'get',
  SET = 'set',
  EXISTS = 'exists',
  GET_EXPIRY = 'expiry',
  SET_EXPIRE_AT = 'expireAt',
  DELETE = 'delete',
  SCAN = 'scan',
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
  ADD = 'add',
  ADD_FIELD = 'addfield',
  MEMORY = 'memory',
  TYPE = 'type',
}

export const cacheApiUrlGenerator = (
  baseUrl: string,
  type: CacheApiDataType,
  methodName: CacheApiUrlSuffixes,
  queryParams = '',
) => {
  return `${baseUrl}/${cacheApiPrefix}/${type}/${methodName}?${queryParams}`;
};

type CacheApiQueryParamsDictionaryType = {
  [key in cacheApiReqPayloadAttributes]?: string | number;
};
export const cacheApiQueryParamGenerator = (
  keyValuePair: CacheApiQueryParamsDictionaryType,
) => {
  let queryParams = '';

  for (const key in keyValuePair) {
    if (Object.prototype.hasOwnProperty.call(keyValuePair, key)) {
      const value = keyValuePair[key];
      queryParams += `&${key}=${encodeURIComponent(value)}`;
    }
  }

  return queryParams;
};
