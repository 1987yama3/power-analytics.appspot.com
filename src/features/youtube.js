var delegate = require('delegate');
var utilities = require('./../utilities');

function getStateName(event_id) {
  switch(event_id) {
  case YT.PlayerState.ENDED: return 'YT.PlayerState.ENDED';
  case YT.PlayerState.PLAYING: return 'YT.PlayerState.PLAYING';
  case YT.PlayerState.PAUSED: return 'YT.PlayerState.PAUSED';
  case YT.PlayerState.BUFFERING: return 'YT.PlayerState.BUFFERING';
  case YT.PlayerState.CUED: return 'YT.PlayerState.CUED';
  case YT.PlayerState.UNSTARTED: return 'YT.PlayerState.UNSTARTED';
  }
  return 'Unknown';
}
module.exports = function() {
  var tracker = this.tracker

  var callback = function(event) {
    var videoData = event.target['getVideoData']()
    var actionName = getEventName(event['data'])
    var labelName = videoData.video_id + ' : ' + videoData.title
    tracker.send('event', 'Youtube Action', actionName, labelName)
  }
  utilities.loadScript('https://www.youtube.com/iframe_api', function() {
    var iframes = document.querySelectorAll('iframe')
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].src.indexOf('youtube.com/embed/') >= 0
          && iframes[i].src.indexOf('enablejsapi=1') >= 0) {
        var player = new YT.Player(iframes[i]);
        player.addEventListener('onStateChange', callback)
      }
    }
  })
};
