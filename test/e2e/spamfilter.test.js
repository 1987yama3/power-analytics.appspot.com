import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { getHitLogs } from './server';
import * as injection from './injection';

let testId;
let options = {
  dimension: {
    index: 1,
    value: 'Referrer Spam Avoidance',
  },
};

describe('SPAM Filter', () => {
  beforeEach((done) => {
    testId = uuid();
    done();
  });

  it('referrer = www.google.co.jp', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://www.google.co.jp'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Referrer Spam Avoidance');
        assert.equal(hits[0].dr, 'https://www.google.co.jp');
      })
      .then(done);
  });

  it('referrer = https://100dollars-seo.com', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://100dollars-seo.com'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://100dollars-seo.com');
      })
      .then(done);
  });

  it('referrer = https://100dollars-seo.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://100dollars-seo.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://100dollars-seo.com/index.html');
      })
      .then(done);
  });

  it('referrer = https://semaltmedia.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://semaltmedia.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://semaltmedia.com/index.html');
      })
      .then(done);
  });

  it('referrer = https://videos-for-your-business.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://videos-for-your-business.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://videos-for-your-business.com/index.html');
      })
      .then(done);
  });

  it('referrer = https://buttons-for-website.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://buttons-for-website.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://buttons-for-website.com/index.html');
      })
      .then(done);
  });

  it('referrer = https://success-seo.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://success-seo.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://success-seo.com/index.html');
      })
      .then(done);
  });

  it('referrer = https://video--production.com/index.html', (done) => {
    browser.get('http://localhost:8888/spamfilter.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://video--production.com/index.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:spamFilter', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Spam Traffic');
        assert.equal(hits[0].dr, 'https://video--production.com/index.html');
      })
      .then(done);
  });
});
