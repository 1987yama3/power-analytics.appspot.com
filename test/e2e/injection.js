export const updateReferrer = (referrer) => {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
  });
};

export const updateUserAgent = (useragent) => {
  Object.defineProperty(navigator, 'userAgent', {
    value: useragent,
  });
};

