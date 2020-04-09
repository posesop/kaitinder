const candidate = require('../../../../app/repository/mongo/candidate');
const Candidate = require('../../../../app/repository/mongo/models/candidate');

describe('Unit tests for candidate repository', () => {
  describe('create function', () => {
    it('should call candidate create', async () => {
      Candidate.create = jest.fn().mockReturnValue('responseData');

      const newCandidate = { name: 'myName' };
      const result = await candidate.create(newCandidate);

      expect(Candidate.create).toBeCalledWith(expect.objectContaining(newCandidate));
      expect(result).toEqual('responseData');
    });
  });

  describe('get function', () => {
    it('should get candidates without query or options', async () => {
      const execObj = {
        exec: jest.fn().mockReturnValue('responseData'),
      };
      Candidate.aggregate = jest.fn().mockReturnValue(execObj);

      const result = await candidate.get({}, {});

      expect(Candidate.aggregate).toBeCalledWith([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: 0 },
        {
          $project: {
            name: 1,
            photo: 1,
            gender: 1,
            city: 1,
            coordinates: 1,
            birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
          },
        },
      ]);
      expect(result).toEqual('responseData');
    });

    it('should get candidates with offset and limit', async () => {
      const execObj = {
        exec: jest.fn().mockReturnValue('responseData'),
      };
      Candidate.aggregate = jest.fn().mockReturnValue(execObj);

      const options = {
        offset: 3,
        limit: 1,
      };
      const result = await candidate.get({}, options);

      expect(Candidate.aggregate).toBeCalledWith([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: 3 },
        { $limit: 1 },
        {
          $project: {
            name: 1,
            photo: 1,
            gender: 1,
            city: 1,
            coordinates: 1,
            birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
          },
        },
      ]);
      expect(result).toEqual('responseData');
    });

    it('should get candidates with query params', async () => {
      const execObj = {
        exec: jest.fn().mockReturnValue('responseData'),
      };
      Candidate.aggregate = jest.fn().mockReturnValue(execObj);

      const query = { filter: 'any' };
      const result = await candidate.get(query, {});

      expect(Candidate.aggregate).toBeCalledWith([
        { $match: { filter: 'any' } },
        { $sort: { createdAt: 1 } },
        { $skip: 0 },
        {
          $project: {
            name: 1,
            photo: 1,
            gender: 1,
            city: 1,
            coordinates: 1,
            birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
          },
        },
      ]);
      expect(result).toEqual('responseData');
    });
  });

  describe('getById function', () => {
    it('should call aggregate with id filter', async () => {
      const execObj = {
        exec: jest.fn().mockReturnValue(['responseData']),
      };
      Candidate.aggregate = jest.fn().mockReturnValue(execObj);

      const result = await candidate.getById('5e7c97e7a3969c0012137c0c');

      expect(Candidate.aggregate).toBeCalled();
      expect(result).toEqual('responseData');
    });
  });
});
