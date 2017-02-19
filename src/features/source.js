import url from 'url';

module.exports = function() {
  const currentUrl = url.parse(location.href);
  const referrerUrl = url.parse(document.referrer);
  let overrideSource = undefined;

  if (currentUrl.query.indexOf('utm_source=') >= 0) return;
  if (currentUrl.query.indexOf('utm_id=') >= 0) return;

  if (referrerUrl.hostname == 't.co') {
    overrideSource = 'twitter.com';
  }
  if (referrerUrl.hostname == 'm.facebook.com'
      || referrerUrl.hostname == 'l.facebook.com'
      || referrerUrl.hostname == 'lm.facebook.com') {
    overrideSource = 'facebook.com';
  }

  if (overrideSource !== undefined) {
    this.tracker.set('campaignSource', overrideSource);
  }
};
