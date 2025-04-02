export enum AxiosMethodNames {
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

export type CacheMethodsApiPayload = {
  [key: string]: {
    method: AxiosMethodNames;
    request: [(string | number | boolean | object)?, any?, any?];
    response: any;
  }[];
};

export interface CacheApiPayloadTestCaseType {
  success: CacheMethodsApiPayload;
  failure: CacheMethodsApiPayload;
}
