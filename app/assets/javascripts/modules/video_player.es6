TT.videoPlayer = (function() {
  const TIMECHANGE_EVENT = 'tt:videoplayer:timechange_event';

  function init() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }


  var player;
  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '505',
      width: '853',
      videoId: 'scxS-MK3HMo',
      events: {
        'onReady': _onPlayerReady,
        'onStateChange': _onPlayerStateChange
      }
    });
  }

  function _onPlayerReady(event) {
    event.target.playVideo();
  }

  var done = false;
  var myInterval = null;
  function _onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      console.log("started interval");
      myInterval = setInterval(broadCastTime, 1000);
    } else {
      console.log("stopping interval");
      setBookMark();
      clearInterval(myInterval);
    }
  }

  function setBookMark() {
    var currTime = player.getCurrentTime();
    $(document).trigger(TIMECHANGE_EVENT, currTime);
  }

  function getEventName(time) {
    var roundedTime = Math.round(time);
    return 'PLAYER-TIME:' + roundedTime;
  }

  function broadCastTime() {
    var currTime = player.getCurrentTime();
    $(document).trigger(getEventName(currTime));
  }

  function stopVideo() {
    player.stopVideo();
  }

  function setVideo() {

  }

  return {
    TIMECHANGE_EVENT: TIMECHANGE_EVENT,
    stopVideo: stopVideo,
    setVideo: setVideo,
    getEventName: getEventName,
    init: init
  }
})();
