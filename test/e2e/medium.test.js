import assert from 'assert';
import uuid from 'uuid';
import * as ga from './ga';
import { getHitLogs } from './server';
import * as injection from './injection';

let testId;

describe('Medium', () => {
  beforeEach((done) => {
    testId = uuid();
    done();
  });

  it('with utm_medium', (done) => {
    browser.get('http://localhost:8888/medium.html?utm_medium=cpc')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
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
    browser.get('http://localhost:8888/medium.html?utm_id=test')
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
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
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://t.co/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'social');
      })
      .then(done);
  }); 

  it('referrer = https://m.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://m.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'social');
      })
      .then(done);
  }); 

  it('referrer = https://l.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://l.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'social');
      })
      .then(done);
  }); 

  it('referrer = https://lm.facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://lm.facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'social');
      })
      .then(done);
  }); 

  it('referrer = https://facebook.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://facebook.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'social');
      })
      .then(done);
  }); 

  it('referrer = https://test.mail.yahoo.co.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://test.mail.yahoo.co.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://test.mail.live.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://test.mail.live.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://test.mail.google.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://test.mail.google.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://test.alpha-mail.ne.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://test.alpha-mail.ne.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://email.exite.co.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://email.exite.co.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://outlook.office365.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://outlook.office365.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://mail.ocn.ne.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://mail.ocn.ne.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://webmail.sso.biglobe.ne.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://webmail.sso.biglobe.ne.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://webmail.so-net.ne.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://webmail.so-net.ne.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://eowebmail.eonet.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://eowebmail.eonet.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://mail.auone-net.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://mail.auone-net.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://mail.goo.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://mail.goo.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://mail.commufa.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://mail.commufa.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://webmail.cyberhome.ne.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://webmail.cyberhome.ne.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://mail45.bizmail123.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://mail45.bizmail123.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'email');
      })
      .then(done);
  }); 

  it('referrer = https://reader.livedoor.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://reader.livedoor.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'rss');
      })
      .then(done);
  }); 

  it('referrer = https://feedly.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://feedly.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'rss');
      })
      .then(done);
  }); 

  it('referrer = https://feeds.feedburner.com/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://feeds.feedburner.com/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
      .then(() => { browser.executeScript(ga.run, 'send', 'pageview'); })
      .then(() => {
        const hits = getHitLogs(testId);
        assert.equal(hits.length, 1);
        assert.equal(hits[0].t, 'pageview');
        assert.equal(hits[0].cm, 'rss');
      })
      .then(done);
  }); 

  it('referrer = https://www.google.co.jp/test.html', (done) => {
    browser.get('http://localhost:8888/medium.html')
      .then(() => { browser.executeScript(injection.updateReferrer, 'https://www.google.co.jp/test.html'); })
      .then(() => { browser.executeScript(ga.run, 'create', 'UA-XXXXXX-Y', 'auto'); })
      .then(() => { browser.executeScript(ga.run, 'require', 'powerup'); })
      .then(() => { browser.executeScript(ga.logHitData, testId); })
      .then(() => { browser.executeScript(ga.run, 'powerup:medium'); } )
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
