import { CacheAppInitializer } from './Bussiness/implementation/CacheAppInitializer';
import {
  HTTP_STATUS_CODES,
  MxApiErrorException,
  RegionIds,
  staticMessages,
} from './Common';

export class CacheApp extends CacheAppInitializer {
  constructor(appToken: string, appRegion: string | number) {
    if (!appToken || !appRegion || typeof appToken !== 'string') {
      throw {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.auth.incorrectTokenOrRegion,
      };
    }

    const normalizedRegionId = Number(appRegion);

    if (isNaN(normalizedRegionId)) {
      throw {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.auth.incorrectRegionId,
      };
    }

    let isRegionIdValid = false;
    for (const key in RegionIds) {
      const keyNumber = Number(key);
      if (!isNaN(keyNumber)) {
        if (keyNumber === normalizedRegionId) {
          isRegionIdValid = true;
          break;
        }
      }
    }

    if (!isRegionIdValid) {
      throw {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.auth.incorrectRegionId,
      };
    }

    super(appToken, normalizedRegionId);
  }
}
