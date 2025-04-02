import { LsCacheApiConnector } from '../../Infrastructure/__mocks__';
import { resetLsCacheApiConnector } from '../../Common/__mocks__';
import { CacheInfo } from '../';
import {
  cacheApiAttributesSupportedTypes,
  CacheApiDataType,
  cacheApiReqPayloadAttributes,
  CacheApiUrlSuffixes,
  HTTP_STATUS_CODES,
  MxApiErrorException,
  staticMessages,
} from '../../Common';

describe('Cache.Info', () => {
  // dummy LsCacheApiConnector doesnt need actual params 😏
  const lsCacheApiConnector = new LsCacheApiConnector('', '');
  const myCacheApp = new CacheInfo(lsCacheApiConnector);

  describe('getMemory', () => {
    it('valid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          key: 'k1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
        {
          key: 2.2,
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        await myCacheApp.getMemory(testCase.key);

        expect(lsCacheApiConnector.get.mock.calls[i][0]).toBe(
          CacheApiDataType.INFO,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.MEMORY,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][2]).toBe(
          testCase.queryParams(),
        );
      }
    });
    it('invalid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.mandatoryAttr.replace(
              '{0}',
              cacheApiReqPayloadAttributes.KEY_NAME,
            ),
          },
        },
        {
          key: { f1: 'v1' },
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.invalidDataType
              .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
              .replace(
                '{1}',
                cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
              ),
          },
        },
      ];

      let failingTestCaseIndex = null;
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
          // @ts-ignore:next-line
          await myCacheApp.getMemory(testCase.key);

          // if the control reaches here that means
          // the above function did NOT throw error
          // so save the index in the below variable
          failingTestCaseIndex = i;
          break;
        } catch (error) {
          expect(error.exceptionType).toBe(testCase.error.exceptionType);
          expect(error.status).toBe(testCase.error.status);
          expect(error.message).toBe(testCase.error.message);
        }
      }

      expect(failingTestCaseIndex).toBeNull();
    });
  });
  describe('getType', () => {
    it('valid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          key: 'k1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
        {
          key: 2.2,
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        await myCacheApp.getType(testCase.key);

        expect(lsCacheApiConnector.get.mock.calls[i][0]).toBe(
          CacheApiDataType.INFO,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.TYPE,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][2]).toBe(
          testCase.queryParams(),
        );
      }
    });
    it('invalid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.mandatoryAttr.replace(
              '{0}',
              cacheApiReqPayloadAttributes.KEY_NAME,
            ),
          },
        },
        {
          key: { f1: 'v1' },
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.invalidDataType
              .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
              .replace(
                '{1}',
                cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC,
              ),
          },
        },
      ];

      let failingTestCaseIndex = null;
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
          // @ts-ignore:next-line
          await myCacheApp.getType(testCase.key);

          // if the control reaches here that means
          // the above function did NOT throw error
          // so save the index in the below variable
          failingTestCaseIndex = i;
          break;
        } catch (error) {
          expect(error.exceptionType).toBe(testCase.error.exceptionType);
          expect(error.status).toBe(testCase.error.status);
          expect(error.message).toBe(testCase.error.message);
        }
      }

      expect(failingTestCaseIndex).toBeNull();
    });
  });
});
