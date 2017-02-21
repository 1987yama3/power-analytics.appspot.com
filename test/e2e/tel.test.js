import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { getHitLogs } from './server';

let testId;

describe('Tel', () => {
  beforeEach((done) => {
    testId = uuid();
    browser.get('http://localhost:8888/tel.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.run, 'powerup:tel'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(done);
  });

  it('tel:0120111222', (done) => {
    element(by.css('#tel-link')).click()
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].ec, 'TEL Link');
        assert.equal(hits[0].ea, 'Click');
        assert.equal(hits[0].el, 'tel:0120111222');
      })
      .then(done);
  });

  it('https://www.google.co.jp', (done) => {
    element(by.css('#outbound-link')).click()
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 0);
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
