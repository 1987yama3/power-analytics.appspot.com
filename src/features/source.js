const parseUrl = require('url');

module.exports = function() {
  const currentUrl = parseUrl(location.href);
  const referrerUrl = parseUrl(document.referrer);
  let overrideSource = undefined;
  if (currentUrl.query.indexOf('utm_source=') >= 0) return;
  if (referrerUrl.hostname == 't.co') overrideSource = 'twitter.com';
  if (referrerUrl.hostname == 'm.facebook.com'
      || referrerUrl.hostname == 'l.facebook.com'
      || referrerUrl.hostname == 'lm.facebook.com') {
    overrideSource = 'facebook.com';
  }

  if (overrideSource) {
    this.tracker.set('campaignSource', overrideSource);
  }
};
