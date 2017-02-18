import {random, timestamp} from '../utilities';

export default (config) => {
  const clientid = self.tracker.get('clientId');
  if (typeof(config['clientid']) !== 'undefined') {
    self.tracker.set('dimension' + config['clientid'], clientid);
  }
  if (typeof(config['sessionid']) !== 'undefined') {
    self.tracker.set('dimension' + config['sessionid'],
        clientid + '#' + random(8));
  }
  if (typeof(config['timestamp']) !== 'undefined') {
    self.tracker.set('dimension' + config['timestamp'], timestamp());
  }
  if (typeof(config['ipaddress']) !== 'undefined') {
    self.tracker.set('dimension' + config['ipaddress'], '{{ipaddress}}');
  }
  if (typeof(config['useragent']) !== 'undefined') {
    self.tracker.set('dimension' + config['useragent'], navigator.userAgent);
  }
};

