import {
  cacheApiAttributesSupportedTypes,
  cacheApiReqPayloadAttributes,
  CacheApiUrlSuffixes,
  HTTP_STATUS_CODES,
  MxApiErrorException,
  staticMessages,
} from '../src/Common';
import { AxiosMethodNames, CacheMethodsApiPayload } from '.';

const successTestCases: CacheMethodsApiPayload = {
  ['getMemory']: [
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
      method: AxiosMethodNames.PUT, //-    currently 0 is giving error
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
  ['getType']: [
    {
      method: AxiosMethodNames.GET,
      request: ['k1'],
      response: 'v1',
    },
    {
      method: AxiosMethodNames.GET,
      request: [1],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [-1],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [0],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [1.5],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: [' '],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['21/09/22'],
      response: true,
    },
    {
      method: AxiosMethodNames.GET,
      request: ['09:08:00'],
      response: true,
    },
  ],
};

const failureTestCases: CacheMethodsApiPayload = {
  ['getMemory']: [
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
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
  ],
  ['getType']: [
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
      request: [{ f1: 'v1' }],
      response: {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: staticMessages.reqPayload.invalidDataType
          .replace('{0}', cacheApiReqPayloadAttributes.KEY_NAME)
          .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
      },
    },
  ],
};

export const cacheInfoTests = {
  success: successTestCases,
  failure: failureTestCases,
};
