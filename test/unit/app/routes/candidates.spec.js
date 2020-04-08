const candidates = require('../../../../app/routes/candidates.controller');

describe('Unit tests for candidates routes', () => {
  describe('getcandidates route tests', () => {
    const mockRequest = {
      query: {
        name: 'name',
        offset: 1,
        limit: 2,
      },
    };
    const mockSend = jest.fn((data) => data);
    const mockResponse = {
      status: jest.fn().mockImplementation(() => ({
        send: mockSend,
      })),
    };
    const mockNext = jest.fn();

    it('should call next with error if domain throws error', async () => {
      const error = new Error('model error');
      const getCandidatesDomain = jest.fn().mockImplementation(() => {
        throw error;
      });

      await candidates.getCandidates(getCandidatesDomain)(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });

    it('should call domain with correct params', async () => {
      const getCandidatesDomain = jest.fn().mockReturnValue('response');

      await candidates.getCandidates(getCandidatesDomain)(mockRequest, mockResponse, mockNext);
      expect(getCandidatesDomain).toHaveBeenCalledWith({ name: 'name' }, { limit: 2, offset: 1 });
    });

    it('should response with OK status', async () => {
      const getCandidatesDomain = jest.fn().mockReturnValue('response');

      await candidates.getCandidates(getCandidatesDomain)(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should response data and pagination', async () => {
      const getCandidatesDomain = jest.fn().mockReturnValue('response');

      await candidates.getCandidates(getCandidatesDomain)(mockRequest, mockResponse, mockNext);
      expect(mockSend).toHaveBeenCalledWith({
        data: 'response',
        pagination: { offset: 1, limit: 2 },
      });
    });
  });
});
