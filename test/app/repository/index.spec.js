const log = require('../../../app/config/log');
const repository = require('../../../app/repository');
const mongo = require('../../../app/repository/mongo');

describe('Unit tests for repository', () => {
  beforeEach(() => {
    log.error = jest.fn();
  });

  describe('init function', () => {
    it('should call mongo.init with all parameters', async () => {
      mongo.init = jest.fn().mockImplementation(() => {
        throw new Error('mongo error');
      });

      let err;
      try {
        await repository.init();
      } catch (error) {
        err = error;
      }
      expect(err.message).toEqual('mongo error');
    });

    it('should throw error if mongo init throws error', async () => {
      mongo.init = jest.fn();

      const result = await repository.init();

      expect(mongo.init).toBeCalledWith();
      expect(result).toBe('Connections ready');
    });
  });
});
