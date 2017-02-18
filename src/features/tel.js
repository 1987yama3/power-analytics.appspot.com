const delegate = require('delegate');

module.exports = function() {
  const tracker = this.tracker;
  delegate(document, 'a[href*="tel:"]', 'click', function(e) {
    tracker.send('event', 'TEL Link', 'Click',
      e.delegateTarget.getAttribute('href'));
  });
};
