function PowerAnalytics(tracker) {
  this.tracker = tracker;
}

PowerAnalytics.prototype.dimensions = require('./features/dimensions');
PowerAnalytics.prototype.source = require('./features/source');
PowerAnalytics.prototype.medium = require('./features/medium');
PowerAnalytics.prototype.outbound = require('./features/outbound');
PowerAnalytics.prototype.tel = require('./features/tel');
PowerAnalytics.prototype.spamFilter = require('./features/spamfilter');
PowerAnalytics.prototype.youtube = require('./features/youtube');

module.exports = PowerAnalytics;
