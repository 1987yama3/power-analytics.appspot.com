export const updateReferrer = (referrer) => {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
  });
};
