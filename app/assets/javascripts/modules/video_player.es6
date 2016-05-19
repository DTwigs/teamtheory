TT.videoPlayer = (function() {
  const TIMECHANGE_EVENT = 'tt:videoplayer:timechange_event';
  let youtubeId = "";
  let startTime;

  function init(yid) {
    youtubeId = yid;
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
      videoId: youtubeId,
      events: {
        'onReady': _onPlayerReady,
        'onStateChange': _onPlayerStateChange
      }
    });
  }

  function _onPlayerReady(event) {
    event.target.playVideo();

    if (startTime) {
      setVideoTime(startTime);
      startTime = undefined;
    }
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

  function setVideoTime(seconds) {
    if (player) {
      player.seekTo(seconds);
      $(document).trigger(getEventName(seconds));
    } else {
      startTime = seconds;
    }
  }

  return {
    TIMECHANGE_EVENT: TIMECHANGE_EVENT,
    stopVideo: stopVideo,
    setVideoTime: setVideoTime,
    getEventName: getEventName,
    init: init
  }
})();
