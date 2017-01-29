var parseUrl = require('url');

module.exports = function() {
  var current_url = parseUrl(location.href);
  var referrer_url = parseUrl(document.referrer);
  var override_source = undefined;
  if (current_url.query.indexOf('utm_source=') >= 0) return;
  if (referrer_url.hostname == 't.co') override_source = 'twitter.com';
  if (referrer_url.hostname == 'm.facebook.com'
      || referrer_url.hostname == 'l.facebook.com'
      || referrer_url.hostname == 'lm.facebook.com') {
    override_source = 'facebook.com';
  }

  if (override_source) {
    this.tracker.set('campaignSource', override_source);
  }
};
