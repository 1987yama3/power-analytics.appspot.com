module.exports = function(config) {
  var referrer = document.referrer;
  var dimensionValue = config['dimension']['value'];
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
  this.tracker.set('dimension' + config['dimension']['index'], dimensionValue);
};
