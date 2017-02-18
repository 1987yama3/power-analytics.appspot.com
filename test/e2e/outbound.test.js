import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { getHitLogs } from './server';

let testId;

describe('Outbound', () => {
  beforeEach((done) => {
    testId = uuid();
    browser.get('http://localhost:8888/outbound.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.run, 'powerup:outbound'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(done);
  });
  it('https://www.google.co.jp', (done) => {
    element(by.css('#outbound-link')).click()
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'event');
        assert.equal(hits[0].ec, 'Outbound Link');
        assert.equal(hits[0].ea, 'Click');
        assert.equal(hits[0].el, 'https://www.google.co.jp');
      })
      .then(done);
  });
  it('inbound link click', (done) => {
    element(by.css('#inbound-link')).click()
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 0);
      })
      .then(done);
  });
});
