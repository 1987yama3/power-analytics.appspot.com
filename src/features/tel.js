import delegate from 'delegate';

module.exports = function() {
  const tracker = this.tracker;
  delegate(document, 'a[href*="tel:"]', 'click', (e) => {
    tracker.send('event', 'TEL Link', 'Click',
        e.delegateTarget.getAttribute('href'));
  });
};
