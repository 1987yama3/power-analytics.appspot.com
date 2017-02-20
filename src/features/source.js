import url from 'url';

module.exports = function() {
  const tracker = this.tracker;
  const currentUrl = url.parse(location.href, true);
  const referrerUrl = url.parse(document.referrer, true);
  let overrideSource = undefined;

  if (currentUrl.query.utm_source !== undefined) {
    return;
  }
  if (currentUrl.query.utm_id !== undefined) {
    return;
  }

  if (referrerUrl.hostname == 't.co') {
    overrideSource = 'twitter.com';
  }

  if (referrerUrl.hostname == 'm.facebook.com'
      || referrerUrl.hostname == 'l.facebook.com'
      || referrerUrl.hostname == 'lm.facebook.com') {
    overrideSource = 'facebook.com';
  }

  if (overrideSource !== undefined) {
    tracker.set('campaignSource', overrideSource);
  }
};
