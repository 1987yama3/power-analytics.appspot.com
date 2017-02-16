import { expect } from 'chai';
const utilities = require('./../../src/utilities');

describe('utilities.capitalize()', () => {
  it('capitalize', () => {
    expect( utilities.capitalize('capitalize') == 'Capitalize' );
  });
  it('Capitalize', () => {
    expect( utilities.capitalize('Capitalize') == 'Capitalize' );
  });
  it('poweranalytics', () => {
    expect( utilities.capitalize('poweranalytics') == 'Poweranalytics' );
  });
});

describe('utilities.loadScript()', () => {
});

describe('utilities.domReady()', () => {
});

describe('utilities.random()', () => {
  it('length', () => {
    expect( utilities.random(1).length == 1 );
    expect( utilities.random(5).length == 5 );
    expect( utilities.random(20).length == 20 );
  });
  it('character', () => {
    expect( utilities.random(5).match(/^[0-9a-zA-Z]{5}$/) );
  });
});

describe('utilities.timestamp()', () => {
  it('format', () => {
    const timestamp = utilities.timestamp();
    expect(timestamp.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}/))
  });
});


