module.exports = function() {
  const img = document.createElement('img');
  const params = [];
  params.push('referrer=' + (document.referrer || 'direct'));
  params.push('display_size='
      + [window.screen.width, window.screen.height].join('x'));
  params.push('window_size='
      + [window.innerWidth, window.innerHeight].join('x'));
  params.push('title=' + document.title);
  params.push('no_cache=' + (new Date()).getTime());
  img.src = '//power-dmp.link/pixel.gif?' + params.join('&');
  img.style = 'display: none;';
  document.body.appendChild(img);
};
