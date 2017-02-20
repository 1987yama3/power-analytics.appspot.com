import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { getHitLogs } from './server';
import * as injection from './injection';

let testId;

describe('Source', () => {
  beforeEach((done) => {
    testId = uuid();
    done();
  });

  it('with utm_source', (done) => {
    browser.get('http://localhost:8888/source.html?utm_source=yahoo&utm_medium=cpc')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, undefined);
      })
      .then(done);
  });

  it('with utm_id', (done) => {
    browser.get('http://localhost:8888/source.html?utm_id=test')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, undefined);
      })
      .then(done);
  });

  it('referrer = https://t.co/test.html', (done) => {
    browser.get('http://localhost:8888/source.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://t.co/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, 'twitter.com');
      })
      .then(done);
  }); 

  it('referrer = https://m.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/source.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://m.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, 'facebook.com');
      })
      .then(done);
  }); 

  it('referrer = https://l.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/source.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://l.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, 'facebook.com');
      })
      .then(done);
  }); 

  it('referrer = https://lm.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/source.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://lm.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, 'facebook.com');
      })
      .then(done);
  }); 

  it('referrer = https://www.google.co.jp/test.html', (done) => {
    browser.get('http://localhost:8888/source.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://www.google.co.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:source'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cs, undefined);
      })
      .then(done);
  }); 



});
