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

describe('Dimensions', () => {
  beforeEach((done) => {
    testId = uuid();
    done();
  });

  it('Client ID', (done) => {
    const options = { clientid: 1 };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.ok(hits[0].cd1.match(/^[0-9]+\.[0-9]+$/));
      })
      .then(done);
  });

  it('Session ID', (done) => {
    const options = { sessionid: 1 };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.ok(hits[0].cd1.match(/^[0-9]+\.[0-9]+#[0-9a-zA-Z]{8}$/));
      })
      .then(done);
  });

  it('Timestamp', (done) => {
    const options = { timestamp: 1 };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.ok(hits[0].cd1.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}/));
      })
      .then(done);
  });

  it('IP Address', (done) => {
    const options = { ipaddress: 1 };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, '{{ipaddress}}');
      })
      .then(done);
  });

  it('User Agent', (done) => {
    const options = { useragent: 1 };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(injection.updateUserAgent, 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cd1, 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1');
      })
      .then(done);
  });

  it('Mix All', (done) => {
    const options = {
      clientid: 1,
      sessionid: 2,
      timestamp: 3,
      ipaddress: 4,
      useragent: 5,
    };
    browser.get('http://localhost:8888/dimensions.html')
      .then(() => { browser.executeScript(injection.updateUserAgent, 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:dimensions', options); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.ok(hits[0].cd1.match(/^[0-9]*\.[0-9]*$/));
        assert.ok(hits[0].cd2.match(/^[0-9]+\.[0-9]+#[0-9a-zA-Z]{8}$/));
        assert.ok(hits[0].cd3.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}:[0-9]{3}/));
        assert.equal(hits[0].cd4, '{{ipaddress}}');
        assert.equal(hits[0].cd5, 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1');
      })
      .then(done);
  });
});
