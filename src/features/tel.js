var delegate = require('delegate');

module.exports = function() {
  var tracker = this.tracker;
  delegate(document.body, 'a[href*="tel:"]', function(e) {
    tracker.send('event', 'TEL Link', 'Click', e.delegateTarget.getAttribute('href'));
  });
};
