const mongoose = require('mongoose');

const mongo = require('../../../../app/repository/mongo');

describe('Unit tests for mongo', () => {
  describe('init function', () => {
    it('should mongoose connect with params', async () => {
      mongoose.connect = jest.fn();
      await mongo.init();

      expect(mongoose.connect).toBeCalledWith('DEFAULT_MONGO_URL', {
        autoReconnect: true,
        keepAlive: true,
        reconnectInterval: 5000,
        reconnectTries: 30,
        socketTimeoutMS: 0,
        useNewUrlParser: true,
      });
    });
  });
});
