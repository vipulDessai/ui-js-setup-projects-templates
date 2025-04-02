import {
  cacheApiAttributesSupportedTypes,
  cacheApiReqPayloadAttributes,
  CacheApiUrlSuffixes,
  HTTP_STATUS_CODES,
  MxApiErrorException,
  staticMessages,
} from '../src/Common';
import { AxiosMethodNames, CacheMethodsApiPayload } from './';

const successTestCases: CacheMethodsApiPayload = {
  [CacheApiUrlSuffixes.ADD]: [
    // key name
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: [1, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: [-1, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: [0, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: [1.5, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: [' ', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['21/09/22', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['09:08:00', 'v1'],
      response: 1,
    },
    // key value
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', -200],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', 0],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', ' '],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', true],
      response: 1,
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1', '21/09/2022'],
      response: 1,
    },
  ],
  [CacheApiUrlSuffixes.GET]: [
    {
      method: AxiosMethodNames.GET,
      request: ['k1'],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: [1],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: [-1],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.PUT,
      request: [0],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: [1.5],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: [' '],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: ['21/09/22'],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: ['09:08:00'],
      response: 'v1',
    },
  ],
  [CacheApiUrlSuffixes.EXISTS]: [
    // key name
    {
      method: AxiosMethodNames.GET,
      request: ['k1', 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [1, 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [-1, 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET, //-    currently 0 is giving error
      request: [0, 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [1.5, 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [' ', 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['21/09/22', 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['09:08:00', 'v1'],
      response: true,
    },
    // key value
    {
      method: AxiosMethodNames.GET,
      request: ['k1', 200],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', -200],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', 0],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', true],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', false],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', ' '],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', { f1: 'v1' }],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1', '21/09/2022'],
      response: true,
    },
  ],
  [CacheApiUrlSuffixes.DELETE]: [
    // key name
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [1, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [-1, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [0, 'v1'],
      response: true,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [1.5, 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [' ', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['21/09/22', 'v1'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['09:08:00', 'v1'],
      response: 1,
    },
    // key value
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', 200],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', -200],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', 0],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', 'abc'],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', ' '],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', true],
      response: 1,
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1', '21/09/2022'],
      response: 1,
    },
  ],
};

const failureTestCases: CacheMethodsApiPayload = {
  [CacheApiUrlSuffixes.ADD]: [
    {
      method: AxiosMethodNames.PUT,
      request: [],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.PUT,
      request: [null],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.PUT,
      request: [false],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.PUT,
      request: [true],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.PUT,
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.PUT,
      request: ['k1'],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.VALUE,
        ),
      },
    },
  ],
  [CacheApiUrlSuffixes.GET]: [
    {
      method: AxiosMethodNames.GET,
      request: [],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [null],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [false],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [true],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
  ],
  [CacheApiUrlSuffixes.EXISTS]: [
    {
      method: AxiosMethodNames.GET,
      request: [],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [null],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [false],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [true],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.GET,
      request: ['k1'],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.VALUE,
        ),
      },
    },
  ],
  [CacheApiUrlSuffixes.DELETE]: [
    {
      method: AxiosMethodNames.DELETE,
      request: [],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [null],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [false],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.KEY_NAME,
        ),
      },
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [true],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.DELETE,
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
    {
      method: AxiosMethodNames.DELETE,
      request: ['k1'],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.mandatoryAttr.replace(
          '{0}',
          cacheApiReqPayloadAttributes.VALUE,
        ),
      },
    },
  ],
};

export const cacheSetTests = {
  success: successTestCases,
  failure: failureTestCases,
};
