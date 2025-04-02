import { LsCacheApiConnector } from '../../Infrastructure/__mocks__';
import { CacheSet } from '../';
import { resetLsCacheApiConnector } from '../../Common/__mocks__';
import {
  cacheApiAttributesSupportedTypes,
  CacheApiDataType,
  cacheApiReqPayloadAttributes,
  CacheApiUrlSuffixes,
  HTTP_STATUS_CODES,
  MxApiErrorException,
  staticMessages,
} from '../../Common';

describe('Cache.Set', () => {
  // dummy LsCacheApiConnector doesnt need actual params 😏
  const lsCacheApiConnector = new LsCacheApiConnector('', '');
  const myCacheApp = new CacheSet(lsCacheApiConnector);

  describe(CacheApiUrlSuffixes.ADD, () => {
    it('valid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          key: 'k1',
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
        {
          key: 2.2,
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}`;
          },
        },
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        await myCacheApp[CacheApiUrlSuffixes.ADD](testCase.key, testCase.value);

        expect(lsCacheApiConnector.put.mock.calls[i][0]).toBe(
          CacheApiDataType.SET,
        );
        expect(lsCacheApiConnector.put.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.ADD,
        );
        expect(lsCacheApiConnector.put.mock.calls[i][2]).toBe(
          testCase.queryParams(),
        );
        expect(lsCacheApiConnector.put.mock.calls[i][3]).toBe(testCase.value);
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
        {
          key: 'k1',
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.mandatoryAttr.replace(
              '{0}',
              cacheApiReqPayloadAttributes.VALUE,
            ),
          },
        },
      ];

      let failingTestCaseIndex = null;
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
          await myCacheApp[CacheApiUrlSuffixes.ADD](
            // @ts-ignore:next-line
            testCase.key,
            // @ts-ignore:next-line
            testCase.value,
          );

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
  describe(CacheApiUrlSuffixes.GET, () => {
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

        await myCacheApp[CacheApiUrlSuffixes.GET](testCase.key);

        expect(lsCacheApiConnector.get.mock.calls[i][0]).toBe(
          CacheApiDataType.SET,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.GET,
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
          await myCacheApp[CacheApiUrlSuffixes.GET](
            // @ts-ignore:next-line
            testCase.key,
            // @ts-ignore:next-line
            testCase.value,
          );

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
  describe(CacheApiUrlSuffixes.EXISTS, () => {
    it('valid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          key: 'k1',
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}&${cacheApiReqPayloadAttributes.KEY_VALUE}=${this.value}`;
          },
        },
        {
          key: 2.2,
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}&${cacheApiReqPayloadAttributes.KEY_VALUE}=${this.value}`;
          },
        },
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        await myCacheApp[CacheApiUrlSuffixes.EXISTS](
          testCase.key,
          testCase.value,
        );

        expect(lsCacheApiConnector.get.mock.calls[i][0]).toBe(
          CacheApiDataType.SET,
        );
        expect(lsCacheApiConnector.get.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.EXISTS,
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
        {
          key: 'k1',
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.mandatoryAttr.replace(
              '{0}',
              cacheApiReqPayloadAttributes.VALUE,
            ),
          },
        },
      ];

      let failingTestCaseIndex = null;
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
          await myCacheApp[CacheApiUrlSuffixes.EXISTS](
            // @ts-ignore:next-line
            testCase.key,
            // @ts-ignore:next-line
            testCase.value,
          );

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
  describe(CacheApiUrlSuffixes.DELETE, () => {
    it('valid payload', async () => {
      resetLsCacheApiConnector(lsCacheApiConnector);

      const testCases = [
        {
          key: 'k1',
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}&${cacheApiReqPayloadAttributes.KEY_VALUE}=${this.value}`;
          },
        },
        {
          key: 2.2,
          value: 'v1',
          queryParams: function () {
            return `&${cacheApiReqPayloadAttributes.KEY_NAME}=${this.key}&${cacheApiReqPayloadAttributes.KEY_VALUE}=${this.value}`;
          },
        },
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        await myCacheApp[CacheApiUrlSuffixes.DELETE](
          testCase.key,
          testCase.value,
        );

        expect(lsCacheApiConnector.delete.mock.calls[i][0]).toBe(
          CacheApiDataType.SET,
        );
        expect(lsCacheApiConnector.delete.mock.calls[i][1]).toBe(
          CacheApiUrlSuffixes.DELETE,
        );
        expect(lsCacheApiConnector.delete.mock.calls[i][2]).toBe(
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
        {
          key: 'k1',
          error: {
            ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
            message: staticMessages.reqPayload.mandatoryAttr.replace(
              '{0}',
              cacheApiReqPayloadAttributes.VALUE,
            ),
          },
        },
      ];

      let failingTestCaseIndex = null;
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
          await myCacheApp[CacheApiUrlSuffixes.DELETE](
            // @ts-ignore:next-line
            testCase.key,
            // @ts-ignore:next-line
            testCase.value,
          );

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
