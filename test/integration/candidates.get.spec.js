const request = require('supertest');
const nock = require('nock');

const { setup, mocks } = require('./helpers');

const mockedCandidates = mocks.mocks;
const path = '/candidates';

describe('GET', () => {
  let env;
  let app;

  beforeAll(async () => {
    env = await setup();
    ({ app } = env);
  });

  describe(path, () => {
    beforeEach(async () => {
      await mocks.createMany();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.abortPendingRequests();
      jest.resetAllMocks();
      await mocks.deleteAll();
    });

    it('should throw a 400 BAD REQUEST error when query params are wrong', async () => {
      const resp = await request(app)
        .get(path)
        .set('Accept', 'application/json')
        .query({
          offset: 'wrong',
          limit: 'wrong',
        })
        .send();
      expect(resp.status).toEqual(400);
      expect(resp.body.data.errors.length).toEqual(2);
    });

    describe.each([
      ['name', mockedCandidates[0].name, [mockedCandidates[0]]],
      ['name', mockedCandidates[1].name, [mockedCandidates[1]]],
    ])('%s', (field, value, expected) => {
      it(`should return return users filtered by ${field} ${value}`, async () => {
        const resp = await request(app)
          .get(path)
          .set('Accept', 'application/json')
          .query({
            [field]: value,
          })
          .send();
        expect(resp.status).toEqual(200);
        const {
          body: { data },
        } = resp;
        expect(data.map((i) => i.name)).toEqual(expected.map((i) => i.name));
      });
    });

    describe.each([
      [{ limit: 0, offset: 0 }, mockedCandidates],
      [{ limit: 1, offset: 0 }, [mockedCandidates[0]]],
      [{ limit: 1, offset: 1 }, [mockedCandidates[1]]],
    ])('%s', ({ limit, offset }, expected) => {
      it(`should return candidates with limit ${limit} and offset ${offset}`, async () => {
        const resp = await request(app)
          .get(path)
          .set('Accept', 'application/json')
          .query({ limit, offset })
          .send();
        expect(resp.status).toEqual(200);
        const {
          body: { data, pagination },
        } = resp;
        expect(data.map((i) => i.name)).toEqual(expected.map((i) => i.name));
        expect(pagination.offset).toEqual(offset.toString());
        expect(pagination.limit).toEqual(limit.toString());
      });
    });
  });
});
