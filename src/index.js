const provide = require('./provide');
const PowerAnalytics = require('./plugins');
require('./features/powerdmp')();

provide('powerup', PowerAnalytics);
