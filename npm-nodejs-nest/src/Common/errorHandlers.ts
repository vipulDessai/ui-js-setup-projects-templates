import { AxiosError } from 'axios';

import {
  HTTP_STATUS_CODES,
  MxApiErrorException,
  staticMessages,
  cacheApiReqPayloadAttributes,
  cacheApiAttributesSupportedTypes,
} from './';

export const genericLsCacheApiAxiosError = (axiosError: AxiosError) => {
  if (!axiosError || !axiosError?.response || !axiosError?.response?.status) {
    return {
      ...MxApiErrorException[HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR],
      message: staticMessages.common.internalError,
    };
  }

  switch (axiosError.response.status) {
    case HTTP_STATUS_CODES.NOT_FOUND:
      return {
        ...MxApiErrorException[HTTP_STATUS_CODES.NOT_FOUND],
        message: axiosError.message,
        details: axiosError,
      };

    case HTTP_STATUS_CODES.BAD_REQUEST:
      return {
        ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
        message: axiosError.message,
        details: axiosError,
      };

    // We dont know who you are 🙁
    case HTTP_STATUS_CODES.UNAUTHENTICATED:
      return {
        ...MxApiErrorException[HTTP_STATUS_CODES.UNAUTHENTICATED],
        message: axiosError.message,
        details: axiosError,
      };

    // i think you dont know who you are 🤣
    case HTTP_STATUS_CODES.UNAUTHORIZED:
      return {
        ...MxApiErrorException[HTTP_STATUS_CODES.UNAUTHORIZED],
        message: axiosError.message,
        details: axiosError,
      };

    default:
      return {
        ...MxApiErrorException[HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR],
        message: axiosError.message,
        details: axiosError,
      };
  }
};

export const genericLsCacheReqPayloadError = (message: string) => {
  return {
    ...MxApiErrorException[HTTP_STATUS_CODES.BAD_REQUEST],
    message,
  };
};

export const checkMandatoryCacheApiField = (
  fieldName: cacheApiReqPayloadAttributes,
  fieldValue: any,
  type: cacheApiAttributesSupportedTypes,
) => {
  switch (type) {
    case cacheApiAttributesSupportedTypes.INTEGER:
      if (fieldValue === undefined) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.mandatoryAttr.replace('{0}', fieldName),
        );
      }

      if (!Number.isInteger(fieldValue)) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.invalidDataType
            .replace('{0}', fieldName)
            .replace('{1}', cacheApiAttributesSupportedTypes.INTEGER),
        );
      }
      break;

    case cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC:
      // we dont have to check for number, as it can be any number
      // but if its anything else then check if its empty/blank/null/false/undefined
      if (typeof fieldValue !== 'number' && !fieldValue) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.mandatoryAttr.replace('{0}', fieldName),
        );
      }

      // if the value is not number and not string, that means its everything else
      // and we will throw an error
      if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number') {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.invalidDataType
            .replace('{0}', fieldName)
            .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
        );
      }

      break;

    case cacheApiAttributesSupportedTypes.ANY:
      if (fieldValue === undefined) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.mandatoryAttr.replace('{0}', fieldName),
        );
      }
      break;

    default:
      break;
  }
};

export const checkNonMandatoryFieldType = (
  fieldName: cacheApiReqPayloadAttributes,
  fieldValue: any,
  type: cacheApiAttributesSupportedTypes,
) => {
  switch (type) {
    case cacheApiAttributesSupportedTypes.INTEGER:
      if (!Number.isInteger(fieldValue)) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.invalidDataType
            .replace('{0}', fieldName)
            .replace('{1}', cacheApiAttributesSupportedTypes.INTEGER),
        );
      }
      break;

    case cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC:
      // we dont have to check for number, as it can be any number
      // but if its anything else then check if its empty/blank/null/false/undefined
      if (typeof fieldValue !== 'number' && !fieldValue) {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.mandatoryAttr.replace('{0}', fieldName),
        );
      }

      // if the value is not number and not string, that means its everything else
      // and we will throw an error
      if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number') {
        throw genericLsCacheReqPayloadError(
          staticMessages.reqPayload.invalidDataType
            .replace('{0}', fieldName)
            .replace('{1}', cacheApiAttributesSupportedTypes.STRING_OR_NUMERIC),
        );
      }

      break;

    default:
      break;
  }
};
