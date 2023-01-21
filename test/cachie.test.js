const request = require('supertest');
const { app, searchQueries } = require('../index.js');

// create a test server by calling `app.listen()` with a random port
const testServer = app.listen(0);
const testAgent = request.agent(testServer);


describe('POST /search', () => {
  it('should add the search query to the set of search queries', async () => {
    let query = 'The quick brown fox jumps over the lazy dog';
    const response = await testAgent
      .post('/search')
      .send({ search_query: query });

    // lowercasing the query to make the analysis case-insensitive
    query = query.toLowerCase();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "status": "ok" });
    expect(searchQueries.has(query)).toBe(true);
  });
});

describe('GET /analyze', () => {
  beforeEach(() => {
    searchQueries.clear();
    searchQueries.add('the quick brown fox jumps over the lazy dog');
    searchQueries.add('the quick lion had mercy on the deer');
    searchQueries.add('the quick zebra outran the cheetah');
  });

  it('should return the number of occurrences of the analysis token in the search queries', async () => {
    const analysisToken = 'the quick,the';
    const response = await testAgent
      .get(`/analyse?analysis_token=${analysisToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ results: { "the quick": 3, "the": 6 }, time: expect.any(String) });
  });

  it('should return a 400 error if the analysis token is invalid', async () => {
    const response = await testAgent.get('/analyse');

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid analysis token' });
  });
});



afterAll(() => {
  // close the test server after all tests are done
  testServer.close();
});
