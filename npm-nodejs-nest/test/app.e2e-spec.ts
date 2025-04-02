import { CacheApp } from '../src/main';
import { ICacheAppInitializer } from '../src/Bussiness';
import { CacheApiDataType } from '../src/Common';

import { cacheInfoTests, cacheSetTests, CacheApiPayloadTestCaseType } from './';

import axios from './__mocks__/axios';

jest.mock('axios');

describe('Cache App (e2e)', () => {
  // passing the dummy arguments because API responses are fake as hell 🤣
  const myCacheApp = new CacheApp('test token', '21');

  // the below code is redundent for different data types
  // so that debugger can have a breather 😇
  describe(CacheApiDataType.SET, () => {
    it('valid data', async () => {
      await checkValidData(myCacheApp, CacheApiDataType.SET, cacheSetTests);
    });
    it('invalid data', async () => {
      await checkFailingData(myCacheApp, CacheApiDataType.SET, cacheSetTests);
    });
  });
  describe(CacheApiDataType.INFO, () => {
    it('valid data', async () => {
      await checkValidData(myCacheApp, CacheApiDataType.INFO, cacheInfoTests);
    });
    it('invalid data', async () => {
      await checkFailingData(myCacheApp, CacheApiDataType.INFO, cacheInfoTests);
    });
  });
});

const checkValidData = async (
  myCacheApp: ICacheAppInitializer,
  dataTypeName: CacheApiDataType | 'hashSet',
  cacheDataType: CacheApiPayloadTestCaseType,
) => {
  const { success } = cacheDataType;
  for (const methodName in success) {
    if (Object.prototype.hasOwnProperty.call(success, methodName)) {
      const methodTestCase = success[methodName];

      for (let i = 0; i < methodTestCase.length; i++) {
        const singleMethodCase = methodTestCase[i];
        const { request, response } = singleMethodCase;

        axios[singleMethodCase.method].mockImplementation(() =>
          Promise.resolve({ data: singleMethodCase.response }),
        );

        const res = await myCacheApp[dataTypeName][methodName](...request);

        expect(res).toBe(response);
      }
    }
  }
};

const checkFailingData = async (
  myCacheApp: ICacheAppInitializer,
  dataTypeName: CacheApiDataType | string,
  cacheDataType: CacheApiPayloadTestCaseType,
) => {
  const { failure } = cacheDataType;
  for (const methodName in failure) {
    if (Object.prototype.hasOwnProperty.call(failure, methodName)) {
      const methodTestCase = failure[methodName];

      let failingTestCaseIndex = null;
      for (let i = 0; i < methodTestCase.length; i++) {
        const singleMethodCase = methodTestCase[i];
        const { request, response } = singleMethodCase;
        try {
          axios[singleMethodCase.method].mockImplementation(() =>
            Promise.resolve({ data: singleMethodCase.response }),
          );

          await myCacheApp[dataTypeName][methodName](...request);

          // if the control reaches here that means
          // the above function did NOT throw error
          // so save the index in the below variable
          failingTestCaseIndex = i;
          break;
        } catch (error) {
          expect(error.exceptionType).toBe(response.exceptionType);
          expect(error.status).toBe(response.status);
          expect(error.message).toBe(response.message);
        }
      }

      expect(failingTestCaseIndex).toBeNull();
    }
  }
};
