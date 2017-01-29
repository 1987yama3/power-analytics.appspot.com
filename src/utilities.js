
module.exports = {
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  loadScript: function(url, callback) {
    var done = false;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        callback();
        script.onload = script.onreadystatechange = null;
        if (head && script.parentNode) {
          head.removeChild(script);
        }
      }
    };
    head.appendChild(script);
  },

  domReady: function(callback) {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', function fn() {
        document.removeEventListener('DOMContentLoaded', fn);
        callback();
      });
    } else {
      callback();
    }
  },

  random: function(length) {
    var result = '';
    var base_string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < length; i++) {
      result += base_string.charAt(Math.floor(Math.random() * base_string.length));
    }
    return result;
  },

  timestamp: function() {
    var d = new Date();
    return [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('/') + ' ' + [
      ('0' + d.getHours()).slice(-2),
      ('0' + d.getMinutes()).slice(-2),
      ('0' + d.getSeconds()).slice(-2),
      ('00' + d.getMilliseconds()).slice(-3)
    ].join(':');
  }
};
