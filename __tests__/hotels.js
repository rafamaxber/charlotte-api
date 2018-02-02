const request = require('supertest');

describe('App',() => {
  const app = require('../config/express-config')();

  test('It should response the GET method', async () => {
    const response = await request(app).get('/hotels?minPrice=200&maxPrice=300&rate=0');
    expect(response.statusCode).toBe(200);
  });

  test('It should equal to mock', async () => {
    const response = await request(app).get('/hotels?minPrice=200&maxPrice=300&rate=0');
    expect(response.body).toMatchSnapshot();
  });

});
