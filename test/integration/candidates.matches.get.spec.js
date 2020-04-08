const request = require('supertest');
const nock = require('nock');

const { setup, mocks } = require('./helpers');
const mockCities = require('./mocks/cities');

const path = '/candidates/candidateId/matches';

const getPath = (mapObj) => path.replace(/candidateId/gi, (matched) => mapObj[matched]);

describe('GET', () => {
  let env;
  let app;
  let created;

  beforeAll(async () => {
    env = await setup();
    ({ app } = env);
  });

  describe(path, () => {
    beforeEach(async () => {
      mockCities.getCities();
      created = await mocks.createMany();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.abortPendingRequests();
      jest.resetAllMocks();
      await mocks.deleteAll();
    });
    it('should throw a 400 BAD REQUEST error when path param is wrong', async () => {
      const resp = await request(app)
        .get(getPath({ candidateId: 'wrongformat' }))
        .set('Accept', 'application/json')
        .send();
      expect(resp.status).toEqual(400);
      expect(resp.body.data.errors.length).toEqual(1);
    });
    it('should throw a 404 NOT_FOUND error when candidate is not found', async () => {
      const resp = await request(app)
        .get(getPath({ candidateId: '5e8cc129061fbd7eba3f2107' }))
        .set('Accept', 'application/json')
        .send();
      expect(resp.status).toEqual(404);
    });
    it('should return return users that match with candidate', async () => {
      const resp = await request(app)
        .get(getPath({ candidateId: created[0]._id.toString() }))
        .set('Accept', 'application/json')
        .send();
      expect(resp.status).toEqual(200);
      const {
        body: { data },
      } = resp;
      expect(data.map((i) => i.name)).toEqual(['bar']);
    });
  });
});
