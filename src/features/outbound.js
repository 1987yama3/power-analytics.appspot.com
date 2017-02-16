const delegate = require('delegate');

module.exports = function() {
  const tracker = this.tracker;
  delegate(document, 'a', 'click', function(e) {
    if (e.delegateTarget.hostname !== location.hostname) {
      tracker.send('event', 'Outbound Link', 'Click',
        e.delegateTarget.getAttribute('href'));
    }
  }, false);
};
