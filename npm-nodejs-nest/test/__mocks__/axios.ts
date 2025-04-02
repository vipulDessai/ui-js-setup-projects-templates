// this is just to mock the global axios imports in various linked components
// you wonder how this file works, the magic is to have root level __mocks__ folder and to have file with axios.js
// so that jest picks it up automatically :-P
const dummyAxios = {
  get: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
  create: () => dummyAxios,
  interceptors: {
    request: {
      // eslint-disable-next-line
      use: (configFn, errorFn) => {},
    },
    response: {
      // eslint-disable-next-line
      use: (successFn, errorFn) => {},
    },
  },
  defaults: {
    headers: {
      common: {},
    },
  },
};

export default dummyAxios;
