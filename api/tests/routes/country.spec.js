/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');
const { preloadCountries } = require('../../src/controllers/countryController')

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Back Countries', () => {
  it('/GET countries', () => {
    const countries = preloadCountries()
    expect(countries.length).equal(250)
  });
})
