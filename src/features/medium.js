var parseUrl = require('url');

module.exports = function() {
  var current_url = parseUrl(location.href);
  var referrer_url = parseUrl(document.referrer);
  var override_medium = undefined;
  if (typeof(current_url.query['utm_medium']) !== 'undefined') return;

  // Email
  if (referrer_url.hostname.indexOf('mail.yahoo.co.jp') >= 0
      || referrer_url.hostname.indexOf('mail.live.com') >= 0
      || referrer_url.hostname.indexOf('mail.google.com') >= 0
      || referrer_url.hostname.indexOf('alpha-mail.ne.jp') >= 0
      || referrer_url.hostname === 'email.exite.co.jp'
      || referrer_url.hostname === 'outlook.office365.com'
      || referrer_url.hostname === 'mail.ocn.ne.jp'
      || referrer_url.hostname === 'webmail.sso.biglobe.ne.jp'
      || referrer_url.hostname === 'webmail.so-net.ne.jp'
      || referrer_url.hostname === 'eowebmail.eonet.jp'
      || referrer_url.hostname === 'mail.auone-net.jp'
      || referrer_url.hostname === 'mail.goo.jp'
      || referrer_url.hostname === 'mail.commufa.jp'
      || referrer_url.hostname === 'webmail.cyberhome.ne.jp'
      || referrer_url.hostname.match(/mail[0-9]+.bizmail[0-9]+.com/)
  ) {
    override_medium = 'email';
  }

  // Organic
  // None

  // Social
  if (referrer_url.hostname === 't.co'
      || referrer_url.hostname.match(/(l?m?\.)?facebook.com/)
  ) {
    override_medium = 'social';
  }

  // Rss Reader
  if (referrer_url.hostname === 'reader.livedoor.com'
      || referrer_url.hostname === 'feedly.com'
      || referrer_url.hostname === 'feeds.feedburner.com'
  ) {
    override_medium = 'rss';
  }

  if (override_medium) {
    this.tracker.set('campaignMedium', override_medium);
  }
};
