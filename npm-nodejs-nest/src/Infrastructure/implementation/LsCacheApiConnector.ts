import axios, { AxiosInstance } from 'axios';

import {
  cacheApiProdUrls,
  genericLsCacheApiAxiosError,
  CacheApiDataType,
  cacheApiUrlGenerator,
  CacheApiUrlSuffixes,
  RegionIds,
} from '../../Common';
import { ILsCacheApiConnector } from '../';

export class LsCacheApiConnector implements ILsCacheApiConnector {
  private apiAdaptor: AxiosInstance;
  private cacheApiBaseUrl: string;
  constructor(cacheAppToken: string, cacheAppRegion: number) {
    // if the developer specified URL is correct, else have the fallback URL ready
    this.cacheApiBaseUrl =
      cacheApiProdUrls[cacheAppRegion] || cacheApiProdUrls[RegionIds.MUM];

    this.apiAdaptor = axios.create();
    // axios interceptor that will bind the cache app token in a new instance of a
    // cache app created using register API
    this.apiAdaptor.interceptors.request.use(function (config) {
      config.headers['AppToken'] = cacheAppToken;
      config.headers['Content-Type'] = 'application/json';

      return config;
    });
    this.apiAdaptor.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
  }
  public async get(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
  ) {
    try {
      const getRes = await this.apiAdaptor.get(
        cacheApiUrlGenerator(
          this.cacheApiBaseUrl,
          type,
          methodName,
          queryParams,
        ),
      );
      return getRes.data;
    } catch (error) {
      throw genericLsCacheApiAxiosError(error);
    }
  }
  public async put(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
    requestBody: any,
  ) {
    try {
      const putRes = await this.apiAdaptor.put(
        cacheApiUrlGenerator(
          this.cacheApiBaseUrl,
          type,
          methodName,
          queryParams,
        ),
        requestBody,
      );
      return putRes.data;
    } catch (error) {
      throw genericLsCacheApiAxiosError(error);
    }
  }
  public async delete(
    type: CacheApiDataType,
    methodName: CacheApiUrlSuffixes,
    queryParams: string,
  ) {
    try {
      const deleteRes = await this.apiAdaptor.delete(
        cacheApiUrlGenerator(
          this.cacheApiBaseUrl,
          type,
          methodName,
          queryParams,
        ),
      );
      return deleteRes.data;
    } catch (error) {
      throw genericLsCacheApiAxiosError(error);
    }
  }
}
