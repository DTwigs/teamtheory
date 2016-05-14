TT.videoPlayer = function() {
  var bookmarks = [
    {
      'id': 'bookmark1',
      'time': 0,
    },
    {
      'id': 'bookmark2',
      'time': 2,
    },
    {
      'id': 'bookmark3',
      'time': 6,
    },
    {
      'id': 'bookmark4',
      'time': 13,
    },
    {
      'id': 'bookmark5',
      'time': 18,
    },
    {
      'id': 'bookmark6',
      'time': 32,
    },
    {
      'id': 'bookmark7',
      'time': 72,
    },
    {
      'id': 'bookmark8',
      'time': 144,
    },
    {
      'id': 'bookmark9',
      'time': 200,
    },
  ]

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  var player;
  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '505',
      width: '853',
      videoId: 'scxS-MK3HMo',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  var done = false;
  var myInterval = null;
  function onPlayerStateChange(event) {
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
    var reverse = bookmarks.slice(0).reverse();
    for(var i = 0; i < reverse.length; i++) {
      if (reverse[i].time <= currTime) {
        highlightItem({data: reverse[i]});
        return true;
      }
    }
    return false;
  }

  function getEventName(time) {
    var roundedTime = Math.round(time);
    return 'PLAYER-TIME:' + roundedTime;
  }

  function broadCastTime() {
    var currTime = player.getCurrentTime();
    $(document).trigger(getEventName(currTime));
    console.log(getEventName(currTime));
  }

  function buildListeners() {
    bookmarks.forEach(function(mark) {
      $(document).on(getEventName(mark.time), mark, highlightItem);
      $(document).on(getEventName(mark.time + 1), mark, highlightItem);
    });
  }

  buildListeners();

  function highlightItem(e) {
    $('.bookmark').removeClass('highlight');
    $('#' + e.data.id).addClass('highlight');
  }

  function stopVideo() {
    player.stopVideo();
  }
};
