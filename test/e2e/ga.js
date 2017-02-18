export const run = (...args) => {
  const ga = window[window.GoogleAnalyticsObject || 'ga'];
  if (typeof ga == 'function') {
    ga(...args);
  }
};

export const getProvidedPlugins = () => {
  return Object.keys(window.gaplugins || {});
};

export const logHitData = (testId) => {
  const ga = window[window.GoogleAnalyticsObject || 'ga'];
  if (typeof ga == 'function') {
    ga((tracker) => {
      const oldSendHitTask = tracker.get('sendHitTask');
      tracker.set('sendHitTask', (model) => {
        const hitIndex = +(localStorage.getItem('hitcounter') || -1) + 1;
        const hitTime = +new Date() - (model.get('queueTime') || 0);
        const hitPayload =
            `${model.get('hitPayload')}&time=${hitTime}&index=${hitIndex}`;

        oldSendHitTask(model);

        if ('sendBeacon' in navigator) {
          navigator.sendBeacon(`/collect/${testId}`, hitPayload);
        } else {
          const beacon = new Image();
          beacon.src = `/collect/${testId}?${hitPayload}`;
        }
        localStorage.setItem('hitcounter', hitIndex);
      });
    });
  }
};

export const sendEmptyHit = (baseUrl, testId) => {
  const beacon = new Image();
  const z = Math.round(Math.random() * 0xffffffff);
  beacon.src = `${baseUrl}/collect/${testId}?empty=1&index=1?nocache=${z}`;
};
