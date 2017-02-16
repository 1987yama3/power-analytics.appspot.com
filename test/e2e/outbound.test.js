import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { start, stop, bindLogAccessors } from './server';

let testId;
let log;

describe('Outbound', () => {
  beforeEach((done) => {
    start(() => {
      testId = uuid();
      log = bindLogAccessors(testId);
      browser.get('http://localhost:8888/outbound.html');
      browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto');
      browser.executeScript(ga.logHitData, testId);
      done();
    });
  });
  afterEach(() => {
    stop();
    log.removeHits();
  });
  it('https://www.google.co.jp', () => {
    browser.executeScript(ga.run, 'require', 'powerup');
    browser.executeScript(ga.run, 'send', 'pageview');
    element(by.css('#link')).click();
    console.log( log.getHits() );
  });
  it('test', () => {
    element(by.css('#link')).getText()
      .then((text) => {
        assert.equal(text, 'https://www.google.co.jp');
      });
  });
});
