const utilities = require('./utilities');

module.exports = function providePlugin(pluginName, pluginConstructor) {
  const gaAlias = window['GoogleAnalyticsObject'] || 'ga';
  window[gaAlias] = window[gaAlias] || function(...args) {
    (window[gaAlias]['q'] = window[gaAlias]['q'] || []).push(...args);
  };

  window[gaAlias]('provide', pluginName, pluginConstructor);
  window.gaplugins = window.gaplugins || {};
  window.gaplugins[utilities.capitalize(pluginName)] = pluginConstructor;
};
