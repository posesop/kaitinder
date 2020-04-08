const request = require('supertest');
const nock = require('nock');

const { setup, mocks, teardown } = require('./helpers');
const mockCities = require('./mocks/cities');

const path = '/candidates';

describe('POST', () => {
  let env;
  let app;

  beforeAll(async () => {
    env = await setup();
    ({ app } = env);
  });

  afterAll(async () => {
    await teardown(env);
  });

  describe(path, () => {
    beforeEach(async () => {
      mockCities.getCities();
      await mocks.createMany();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.abortPendingRequests();
      jest.resetAllMocks();
      await mocks.deleteAll();
    });

    it('should throw a 400 BAD REQUEST error when body params are wrong', async () => {
      const resp = await request(app)
        .post(path)
        .set('Accept', 'application/json')
        .send({ invalid: 'nope' });
      expect(resp.status).toEqual(400);
      expect(resp.body.data.errors.length).toEqual(1);
    });

    it('should return created candidate info', async () => {
      const body = {
        name: 'Victor Pose',
        birthDate: '1990-07-05',
        city: 'Salamanca',
        gender: 'M',
      };
      const resp = await request(app)
        .post(path)
        .set('Accept', 'application/json')
        .send(body);
      expect(resp.status).toEqual(200);
      const {
        body: { data },
      } = resp;
      expect(data.name).toEqual(body.name);
      expect.stringMatching(data._id, /^[0-9a-fA-F]{24}$/);
    });
  });
});
