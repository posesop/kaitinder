
const { createCandidate } = require('../../../app/domain/candidates');

describe('Unit tests for candidates domain', () => {
  describe('createCandidate function', () => {
    it('should call functions and return persist result', async () => {
      const getCitiesFn = jest.fn().mockReturnValue([
        {
          city: 'Madrid',
          lat: 1,
          long: 2,
        }
      ]);
      const persistFn = jest.fn().mockReturnValue('responseFromPersist');
      const newCandidate = {
        name: 'Yo',
        city: 'Madrid',
      }
      const result = await createCandidate(getCitiesFn, persistFn)(newCandidate);

      expect(getCitiesFn).toBeCalledWith();
      expect(persistFn).toBeCalledWith({
        city: 'Madrid',
        coordinates: {lat: 1, long: 2},
        name: 'Yo',
      });
      expect(result).toBe('responseFromPersist');
    });
  });
});
