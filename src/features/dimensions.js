const utilities = require('./../utilities');

module.exports = function(config) {
  const clientid = this.tracker.get('clientId');
  if (typeof(config['clientid']) !== 'undefined') {
    this.tracker.set('dimension' + config['clientid'], clientid);
  }
  if (typeof(config['sessionid']) !== 'undefined') {
    this.tracker.set('dimension' + config['sessionid'],
        clientid + '#' + utilities.random(8));
  }
  if (typeof(config['timestamp']) !== 'undefined') {
    this.tracker.set('dimension' + config['timestamp'], utilities.timestamp());
  }
  if (typeof(config['ipaddress']) !== 'undefined') {
    this.tracker.set('dimension' + config['ipaddress'], '{{ipaddress}}');
  }
  if (typeof(config['useragent']) !== 'undefined') {
    this.tracker.set('dimension' + config['useragent'], navigator.userAgent);
  }
};

