const request = require('request');

const serverUrl = 'http://127.0.0.1:7777';


describe('Server', () => {


  test('Should be able to handle GET request', (done) => {

    request({
      url: `${serverUrl}/booking/5`,
      method: 'GET',
    }, (error, response, body) => {
      expect(response.statusCode).toBe(200);
    });

    done();
  });

  test('Should be able to handle POST request', (done) => {

    request({
      url: `${serverUrl}/booking`,
      method: 'POST',
    }, (error, response, body) => {
      expect(response.statusCode).toBe(200);
    });

    done();
  });

  test('Should 404 when asked for a nonexistent room', (done) => {

    request({
      url: `${serverUrl}/booking/777`,
      method: 'GET',
    }, (error, response, body) => {
      expect(response.statusCode).toBe(404);
    });

    done();
  });
});
