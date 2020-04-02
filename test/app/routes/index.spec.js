const routes = require('../../../app/routes');

describe('Unit tests for routes index', () => {
  let router;

  beforeEach(() => {
    router = {
      post: jest.fn(),
      patch: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should nothing', async () => {

    expect(true).toEqual(true)
  });
});
