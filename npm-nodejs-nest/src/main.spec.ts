import { CacheInfo, CacheSet } from './Bussiness';
import {
  HTTP_STATUS_CODES,
  MxApiErrorException,
  RegionIds,
  staticMessages,
} from './Common';
import { CacheApp } from './main';

describe('Cache', () => {
  it('valid data', () => {
    const validTests = [
      {
        token: 'good key',
        region: `${RegionIds.MUM}`,
      },
      {
        token: 'good key',
        region: RegionIds.MUM,
      },
    ];

    for (const key in validTests) {
      if (Object.prototype.hasOwnProperty.call(validTests, key)) {
        const { token, region } = validTests[key];

        const myApp = new CacheApp(token, region);
        
        expect(myApp.set).toBeInstanceOf(CacheSet);
        expect(myApp.info).toBeInstanceOf(CacheInfo);
      }
    }
  });

  it('invalid data', () => {
    const invalidData = [
      {
        token: '',
        region: '',
        exception: {
          ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
          message: staticMessages.auth.incorrectTokenOrRegion,
        },
      },
      {
        token: {
          token: 'too complicated token',
        },
        region: RegionIds.MUM,
        exception: {
          ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
          message: staticMessages.auth.incorrectTokenOrRegion,
        },
      },
      {
        token: 'good token',
        region: 'bad number',
        exception: {
          ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
          message: staticMessages.auth.incorrectRegionId,
        },
      },
      {
        token: 'good token',
        region: 999,
        exception: {
          ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
          message: staticMessages.auth.incorrectRegionId,
        },
      },
      {
        token: 'good token',
        region: { k1: 'v1' },
        exception: {
          ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
          message: staticMessages.auth.incorrectRegionId,
        },
      },
    ];

    let failingTestCaseIndex = null;
    for (const key in invalidData) {
      if (Object.prototype.hasOwnProperty.call(invalidData, key)) {
        const { token, region, exception } = invalidData[key];

        try {
          // @ts-ignore:next-line
          new CacheApp(token, region);

          // if the control reaches here that means
          // the above function did NOT throw error
          // so save the index in the below variable
          failingTestCaseIndex = key;
          break;
        } catch (error) {
          expect(error.exceptionType).toBe(exception.exceptionType);
          expect(error.status).toBe(exception.status);
          expect(error.message).toBe(exception.message);
        }
      }
    }

    expect(failingTestCaseIndex).toBeNull();
  });
});
