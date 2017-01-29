var provide = require('./provide');
var PowerAnalytics = require('./plugins');
require('./features/powerdmp')();

provide('powerup', PowerAnalytics);
