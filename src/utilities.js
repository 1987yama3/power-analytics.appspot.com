
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const loadScript = (url, callback) => {
  let done = false;
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.src = url;
  script.onload = script.onreadystatechange = () => {
    if (!done && (!script.readyState || script.readyState === 'loaded'
          || script.readyState === 'complete')) {
      done = true;
      callback();
      script.onload = script.onreadystatechange = null;
      if (head && script.parentNode) {
        head.removeChild(script);
      }
    }
  };
  head.appendChild(script);
};

export const domReady = (callback) => {
  if (document.readyState == 'loaded') {
    document.addEventListener('DOMContentLoaded', function fn() {
      document.removeEventListener('DOMContentLoaded', fn);
      callback();
    });
  } else {
    callback();
  }
};

export const random = (length) => {
  let result = '';
  const baseString
    = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i++) {
    result +=
      baseString.charAt(Math.floor(Math.random() * baseString.length));
  }
  return result;
};

export const timestamp = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('/') + ' ' + [
    ('0' + d.getHours()).slice(-2),
    ('0' + d.getMinutes()).slice(-2),
    ('0' + d.getSeconds()).slice(-2),
    ('00' + d.getMilliseconds()).slice(-3),
  ].join(':');
};
