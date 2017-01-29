var delegate = require('delegate');

module.exports = function() {
  var tracker = this.tracker;
  console.log(tracker);
  delegate(document, 'a', 'click', function(e) {
    console.log(e);
    if (e.delegateTarget.hostname !== location.hostname) {
      tracker.send('event', 'Outbound Link', 'Click', e.delegateTarget.getAttribute('href'));
    }
  }, false);
};
