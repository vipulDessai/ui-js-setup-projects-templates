/**
 * @description
 * The region id type should be interger and the value should be 21 for MUM, 11 for US, 1 for SGP, and 31 for IR
 */
export enum RegionIds {
  SGP = 1,
  US = 11,
  MUM = 21,
  IR = 31,
}

export const cacheApiProdUrls = {
  [RegionIds.MUM]: 'https://lsqcustomcache-in21.leadsquaredapps.com​​​​​​​',
  [RegionIds.US]: 'https://lsqcustomcache-us11.leadsquaredapps.com',
  [RegionIds.SGP]: 'https://lsqcustomcache.leadsquaredapps.com',
  [RegionIds.IR]: 'https://lsqcustomcache-ir31.leadsquaredapps.com',
};

export enum HTTP_STATUS_CODES {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHENTICATED = 401,
  UNAUTHORIZED = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export const MxApiErrorException = {
  [HTTP_STATUS_CODES.BAD_REQUEST]: {
    exceptionType: 'MXInvalidDataException',
    status: HTTP_STATUS_CODES.BAD_REQUEST,
  },
  [HTTP_STATUS_CODES.NOT_FOUND]: {
    exceptionType: 'MXResourceNotFoundException',
    status: HTTP_STATUS_CODES.NOT_FOUND,
  },
  [HTTP_STATUS_CODES.UNAUTHENTICATED]: {
    exceptionType: 'MXResourceUnauthenticatedException',
    status: HTTP_STATUS_CODES.UNAUTHENTICATED,
  },
  [HTTP_STATUS_CODES.UNAUTHORIZED]: {
    exceptionType: 'MXResourceUnauthorizedException',
    status: HTTP_STATUS_CODES.UNAUTHORIZED,
  },
  [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: {
    exceptionType: 'MXInternalErrorException',
    status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  },
};

export const cacheApiPrefix = 'cache';

export enum cacheApiReqPayloadAttributes {
  KEY_NAME = 'key_name',
  KEY_VALUE = 'key_value',
  VALUE = 'value',
  TTL = 'ttl',
  PAGE_INDEX = 'pageIndex',
  INC_BY = 'incrBy',
  DEC_BY = 'decrBy',
  FIELD_NAME = 'field_name',
}

export enum cacheApiAttributesSupportedTypes {
  ANY = 'any',
  STRING = 'string',
  INTEGER = 'integer',
  STRING_OR_NUMERIC = 'string or numeric',
}

export const staticMessages = {
  reqPayload: {
    mandatoryAttr:
      '"{0}" argument is mandatory and should not be undefined/blank/empty/null value',
    invalidDataType: '"{0}" argument should be of "{1}" type',
  },
  auth: {
    incorrectTokenOrRegion:
      'Either invalid value for app token or app region, or one of them is not provided.',
    incorrectRegionId:
      'The allowed numeric values for the region are 21 for MUM, 11 for US, 1 for SGP, and 31 for IR.',
  },
  common: {
    internalError: 'Something went wrong',
  },
};
