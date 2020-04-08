const candidatesIndex = require('../../../../../app/modules/candidates/domain');
const candidatesDomain = require('../../../../../app/modules/candidates/domain/candidates');
const Candidate = require('../../../../../app/modules/candidates/repository/candidate');
const cities = require('../../../../../app/services/cities');

describe('Unit tests for candidates domain', () => {
  describe('createCandidate route tests', () => {
    it('should call candidates createCandidate with all parameters', async () => {
      const secondFn = jest.fn().mockReturnValue('responseData');
      candidatesDomain.createCandidate = jest.fn().mockReturnValue(secondFn);

      const result = await candidatesIndex.createCandidate('newCandidate');

      expect(candidatesDomain.createCandidate).toBeCalledWith(cities.getCities, Candidate.create);
      expect(secondFn).toBeCalledWith('newCandidate');
      expect(result).toBe('responseData');
    });
  });
});
