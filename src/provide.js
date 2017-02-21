import {capitalize} from './utilities';

export default (pluginName, pluginConstructor) => {
  const gaAlias = window['GoogleAnalyticsObject'] || 'ga';
  window[gaAlias] = window[gaAlias] || function(...args) {
    (window[gaAlias]['q'] = window[gaAlias]['q'] || []).push(...args);
  };

  window[gaAlias]('provide', pluginName, pluginConstructor);
  window.gaplugins = window.gaplugins || {};
  window.gaplugins[capitalize(pluginName)] = pluginConstructor;
};
