module.exports = function(config) {
  let dimensionValue = config['dimension']['value'];
  const referrer = document.referrer;
  const spamList = [
    '100dollars-seo.com',
    'semaltmedia.com',
    'videos-for-your-business.com',
    'buttons-for-website.com',
    'success-seo.com',
    'video--production.com',
  ];
  for (let i = 0; i < spamList.length; i++) {
    if (referrer.indexOf(spamList[i]) >= 0) {
      dimensionValue = 'Spam Traffic';
    }
  }
  this.tracker.set('dimension' + config['dimension']['index'], dimensionValue);
};
