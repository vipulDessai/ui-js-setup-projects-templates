import { LsCacheApiConnector } from '../../Infrastructure/__mocks__';

/**
 * @description reset the lsCacheApiConnector methods so that
 * the jest.fn().mock.calls do not keep the old records
 * @param lsCacheApiConnector
 * @returns lsCacheApiConnector
 */
export const resetLsCacheApiConnector = (
  lsCacheApiConnector: LsCacheApiConnector,
) => {
  lsCacheApiConnector.get = jest.fn();
  lsCacheApiConnector.put = jest.fn();
  lsCacheApiConnector.delete = jest.fn();

  return lsCacheApiConnector;
};
