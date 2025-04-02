import {
  cacheApiReqPayloadAttributes,
  CacheApiDataType,
  cacheApiQueryParamGenerator,
  CacheApiUrlSuffixes,
  checkMandatoryCacheApiField,
  cacheApiAttributesSupportedTypes,
} from '../../Common';
import { ILsCacheApiConnector } from '../../Infrastructure';
import { ICacheInfo } from '../';

export class CacheInfo implements ICacheInfo {
  private apiType: CacheApiDataType.INFO;
  constructor(private apiConnector: ILsCacheApiConnector) {
    this.apiType = CacheApiDataType.INFO;
  }
  public async getMemory(key: string | number): Promise<number> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    return this.apiConnector.get(
      this.apiType,
      CacheApiUrlSuffixes.MEMORY,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
      }),
    );
  }
  public async getType(key: string | number): Promise<string> {
    checkMandatoryCacheApiField(
      cacheApiReqPayloadAttributes.KEY_NAME,
      key,
      cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
    );

    return this.apiConnector.get(
      this.apiType,
      CacheApiUrlSuffixes.TYPE,
      cacheApiQueryParamGenerator({
        [cacheApiReqPayloadAttributes.KEY_NAME]: key,
      }),
    );
  }
}
