require('babel-register');
import provide from './provide';
const PowerAnalytics = require('./plugins');
require('./features/powerdmp')();

provide('powerup', PowerAnalytics);
