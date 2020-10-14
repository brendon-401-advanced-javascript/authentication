'use strict';
const rootDir = process.cwd();
const supergoose = require('@code-fellows/supergoose');
const {app } = require('../server.js');
const request = supergoose(app);

describe('api server', () => {
  it('should respond with a 404 on an invalid route', async() => {
      let response = await request.get('/bad');
      expect (response.status).toEqual(404);
  });

  it('should respond with a 404 on an invalid route', async () => {
    let response = await request.get('/bad');
    expect (response.status).toEqual(404);
  });
});