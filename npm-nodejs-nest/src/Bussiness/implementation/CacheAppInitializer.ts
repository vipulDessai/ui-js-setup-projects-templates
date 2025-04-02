import { LsCacheApiConnector } from '../../Infrastructure';
import {
  ICacheAppInitializer,
  ICacheInfo,
  ICacheSet,
  CacheInfo,
  CacheSet,
} from '../';

export class CacheAppInitializer implements ICacheAppInitializer {
  public info: ICacheInfo;
  public set: ICacheSet;
  constructor(appToken: string, appRegion: number) {
    const lsCacheApiConnector = new LsCacheApiConnector(appToken, appRegion);
    this.info = new CacheInfo(lsCacheApiConnector);
    this.set = new CacheSet(lsCacheApiConnector);
  }
}
