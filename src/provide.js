var utilities = require('./utilities');

module.exports = function providePlugin(pluginName, pluginConstructor) {
  var gaAlias = window['GoogleAnalyticsObject'] || 'ga';
  window[gaAlias] = window[gaAlias] || function() {
    (window[gaAlias]['q'] = window[gaAlias]['q'] || []).push(arguments);
  };

  window[gaAlias]('provide', pluginName, pluginConstructor);
  window.gaplugins = window.gaplugins || {};
  window.gaplugins[utilities.capitalize(pluginName)] = pluginConstructor;
  console.log('provided plugins', window.gaplugins);
};
