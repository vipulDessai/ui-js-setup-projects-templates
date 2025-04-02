import {
  cacheApiAttributesSupportedTypes,
  CacheApiDataType,
  cacheApiQueryParamGenerator,
  cacheApiReqPayloadAttributes,
  CacheApiUrlSuffixes,
  checkMandatoryCacheApiField,
} from '../../Common';
import { ILsCacheApiConnector } from '../../Infrastructure';
import { ICacheSet } from '../';

export class CacheSet implements ICacheSet {
  private apiType: CacheApiDataType.SET;
  constructor(private apiConnector: ILsCacheApiConnector) {
    this.apiType = CacheApiDataType.SET;
  }
  public async add(key: string | number, value: any): Promise<number> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.VALUE,
      value,
      cacheApiAttributesSupportedTypes.ANY,
    );

    return this.apiConnector.put(
      this.apiType,
      CacheApiUrlSuffixes.ADD,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
      }),
      value,
    );
  }
  public async get(key: string | number): Promise<string[]> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    return this.apiConnector.get(
      this.apiType,
      CacheApiUrlSuffixes.GET,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
      }),
    );
  }
  public async exists(key: string | number, value: any): Promise<boolean> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.VALUE,
      value,
      cacheApiAttributesSupportedTypes.ANY,
    );

    return this.apiConnector.get(
      this.apiType,
      CacheApiUrlSuffixes.EXISTS,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
        [cacheApiReqPayloadAttributes.KEY_VALUE]: value,
      }),
    );
  }
  public async delete(key: string | number, value: any): Promise<number> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.VALUE,
      value,
      cacheApiAttributesSupportedTypes.ANY,
    );

    return this.apiConnector.delete(
      this.apiType,
      CacheApiUrlSuffixes.DELETE,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
        [cacheApiReqPayloadAttributes.KEY_VALUE]: value,
      }),
    );
  }
}
