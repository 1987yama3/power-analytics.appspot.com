(function () {
  function providePlugin(pluginName, pluginConstructor) {
    var ga = window[ window['GoogleAnalyticsObject'] || 'ga' ];
    if (ga) {
      ga('provide', pluginName, pluginConstructor);
    }
  }

  function PowerAnalytics(tracker) {
    this.tracker = tracker;
  }

  function getHostname(url) {
    try {
      return url.split('/')[2];
    } catch (ex) { return ''; }
  }

  function getRandomString (length) {
    var result = '';
    var base_string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < length; i++) {
      result += base_string.charAt(Math.floor(Math.random() * base_string.length));
    }
    return result;
  }

  function getTimestamp () {
    var d = new Date();
    var datetime = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('/') + ' ' + [
      ('0' + d.getHours()).slice(-2),
      ('0' + d.getMinutes()).slice(-2),
      ('0' + d.getSeconds()).slice(-2),
      ('00' + d.getMilliseconds()).slice(-3)
    ].join(':');
    return datetime;
  }

  PowerAnalytics.prototype.dimensions = function (configuration) {
    var clientid = this.tracker.get('clientId');
    if (typeof(configuration['clientid']) !== 'undefined') {
      this.tracker.set('dimension' + configuration['clientid'], clientid);
    }
    if (typeof(configuration['sessionid']) !== 'undefined') {
      this.tracker.set('dimension' + configuration['sessionid'], clientid + '#' + getRandomString(8));
    }
    if (typeof(configuration['timestamp']) !== 'undefined') {
      this.tracker.set('dimension' + configuration['timestamp'], getTimestamp());
    }
    if (typeof(configuration['ipaddress']) !== 'undefined') {
      this.tracker.set('dimension' + configuration['ipaddress'], '{{ipaddress}}');
    }
    if (typeof(configuration['useragent']) !== 'undefined') {
      this.tracker.set('dimension' + configuration['useragent'], navigator.userAgent);
    }
  };

  PowerAnalytics.prototype.spamFilter = function (configuration) {
    var referrer = document.referrer;
    var dimensionValue = configuration['dimension']['value'];
    var spam_list = [
      '100dollars-seo.com',
      'semaltmedia.com',
      'videos-for-your-business.com',
      'buttons-for-website.com',
      'success-seo.com',
      'video--production.com'
    ];
    for (var i = 0; i < spam_list.length; i++) {
      if (referrer.indexOf(spam_list[i]) >= 0) {
        dimensionValue = 'Spam Traffic';
      }
    }
    this.tracker.set('dimension' + configuration['dimension']['index'], dimensionValue);
  };

  PowerAnalytics.prototype.source = function () {
    if (location.search.indexOf('utm_source') >= 0) return;
    var referrerHostname = getHostname(document.referrer);
    var source = undefined;
    if (referrerHostname.match(/t\.co/)) source = 'twitter.com';
    if (referrerHostname.match(/(m\.|l\.|lm\.)?facebook\.com/)) source = 'facebook.com';

    if (source) {
      this.tracker.set('campaignSource', source);
    }
  };

  PowerAnalytics.prototype.medium = function () {
    if (location.search.indexOf('utm_medium') >= 0) return;
    var referrerHostname = getHostname(document.referrer);
    var medium = undefined;

    // Webメール
    if (referrerHostname.indexOf('mail.yahoo.co.jp') >= 0) medium = 'email';
    if (referrerHostname.indexOf('mail.live.com') >= 0) medium = 'email';
    if (referrerHostname.indexOf('mail.google.com') >= 0) medium = 'email';
    if (referrerHostname.indexOf('alpha-mail.ne.jp') >= 0) medium = 'email';
    if (referrerHostname == 'email.excite.co.jp') medium = 'email';
    if (referrerHostname == 'outlook.office365.com') medium = 'email';
    if (referrerHostname == 'mail.ocn.ne.jp') medium = 'email';
    if (referrerHostname == 'webmail.sso.biglobe.ne.jp') medium = 'email';
    if (referrerHostname == 'webmail.so-net.ne.jp') medium = 'email';
    if (referrerHostname == 'eowebmail.eonet.jp') medium = 'email';
    if (referrerHostname == 'mail.auone-net.jp') medium = 'email';
    if (referrerHostname == 'mail.goo.jp') medium = 'email';
    if (referrerHostname == 'mail.commufa.jp') medium = 'email';
    if (referrerHostname == 'webmail.cyberhome.ne.jp') medium = 'email';
    if (referrerHostname.match(/mail[0-9]+.bizmail[0-9]+.com/)) medium = 'email';

    // Social
    if (referrerHostname.match(/t.co/)) medium = 'social';
    if (referrerHostname.indexOf('t.co') >= 0 && referrerHostname.length == 4) medium = 'social'
    if (referrerHostname.match(/(m.|l.|lm.)?facebook\.com/)) medium = 'social';

    // Rss Reader
    if (referrerHostname == 'reader.livedoor.com') medium = 'rss';
    if (referrerHostname == 'feedly.com') medium = 'rss';
    if (referrerHostname == 'feeds.feedburner.com') medium = 'rss';

    if (medium) {
      this.tracker.set('campaignMedium', medium);
    }
  };

  providePlugin('powerup', PowerAnalytics);
})();
