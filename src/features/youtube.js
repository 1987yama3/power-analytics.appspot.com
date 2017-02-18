import {loadScript} from '../utilities';

const getStateName = (eventId) => {
  switch(eventId) {
  case YT.PlayerState.ENDED: return 'YT.PlayerState.ENDED';
  case YT.PlayerState.PLAYING: return 'YT.PlayerState.PLAYING';
  case YT.PlayerState.PAUSED: return 'YT.PlayerState.PAUSED';
  case YT.PlayerState.BUFFERING: return 'YT.PlayerState.BUFFERING';
  case YT.PlayerState.CUED: return 'YT.PlayerState.CUED';
  case YT.PlayerState.UNSTARTED: return 'YT.PlayerState.UNSTARTED';
  }
  return 'Unknown';
};
module.exports = function() {
  const tracker = this.tracker;

  const callback = (event) => {
    const videoData = event.target['getVideoData']();
    const actionName = getStateName(event['data']);
    const labelName = videoData.video_id + ' : ' + videoData.title;
    tracker.send('event', 'Youtube Action', actionName, labelName);
  };
  loadScript('https://www.youtube.com/iframe_api', () => {
    const iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i].src.indexOf('youtube.com/embed/') >= 0
          && iframes[i].src.indexOf('enablejsapi=1') >= 0) {
        const player = new YT.Player(iframes[i]);
        player.addEventListener('onStateChange', callback);
      }
    }
  });
};
