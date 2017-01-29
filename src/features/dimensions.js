var utilities = require('./../utilities');

module.exports = function(config) {
  var clientid = this.tracker.get('clientId');
  console.log(config);
  if (typeof(config['clientid']) !== 'undefined') {
    this.tracker.set('dimension' + config['clientid'], clientid);
  }
  if (typeof(config['sessionid']) !== 'undefined') {
    this.tracker.set('dimension' + config['sessionid'], clientid + '#' + utilities.random(8));
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

