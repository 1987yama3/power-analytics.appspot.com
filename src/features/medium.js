import url from 'url';

module.exports = function() {
  const currentUrl = url.parse(location.href, true);
  const referrerUrl = url.parse(document.referrer, true);
  let overrideMedium = undefined;

  if (currentUrl.query.utm_medium) {
    return;
  }
  if (currentUrl.query.utm_id) {
    return;
  }

  // Email
  if (referrerUrl.hostname.indexOf('mail.yahoo.co.jp') >= 0
      || referrerUrl.hostname.indexOf('mail.live.com') >= 0
      || referrerUrl.hostname.indexOf('mail.google.com') >= 0
      || referrerUrl.hostname.indexOf('alpha-mail.ne.jp') >= 0
      || referrerUrl.hostname === 'email.exite.co.jp'
      || referrerUrl.hostname === 'outlook.office365.com'
      || referrerUrl.hostname === 'mail.ocn.ne.jp'
      || referrerUrl.hostname === 'webmail.sso.biglobe.ne.jp'
      || referrerUrl.hostname === 'webmail.so-net.ne.jp'
      || referrerUrl.hostname === 'eowebmail.eonet.jp'
      || referrerUrl.hostname === 'mail.auone-net.jp'
      || referrerUrl.hostname === 'mail.goo.jp'
      || referrerUrl.hostname === 'mail.commufa.jp'
      || referrerUrl.hostname === 'webmail.cyberhome.ne.jp'
      || referrerUrl.hostname.match(/mail[0-9]+.bizmail[0-9]+.com/)
  ) {
    overrideMedium = 'email';
  }

  // Organic
  // None

  // Social
  if (referrerUrl.hostname === 't.co'
      || referrerUrl.hostname.match(/(l?m?\.)?facebook.com/)
  ) {
    overrideMedium = 'social';
  }

  // Rss Reader
  if (referrerUrl.hostname === 'reader.livedoor.com'
      || referrerUrl.hostname === 'feedly.com'
      || referrerUrl.hostname === 'feeds.feedburner.com'
  ) {
    overrideMedium = 'rss';
  }

  if (overrideMedium) {
    this.tracker.set('campaignMedium', overrideMedium);
  }
};
