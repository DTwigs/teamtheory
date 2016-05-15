

class VideoBookmarks extends React.Component {
  constructor (props) {
    super(props);
    videoBookmarksStore.init(this.props.bookmarks);
    this.state = this.getBookmarksState();
  }

  getBookmarksState () {
    return {
      allBookmarks: videoBookmarksStore.getAll()
    };
  }

  _onChange () {
    this.setState(this.getBookmarksState());
  }

  componentDidMount () {
    videoBookmarksStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    videoBookmarksStore.removeChangeListener(this._onChange.bind(this));
  }

  render () {
    let bookmarksArray = () => {
      let bookmarks = [],
        allBookmarks = this.state.allBookmarks;
      for (var id in allBookmarks) {
        bookmarks.push((<VideoBookmark bookmark={allBookmarks[id]} key={id}></VideoBookmark>));
      }
      return bookmarks;
    };

    return (
      <ul className="bookmarks-container">
        {bookmarksArray()}
      </ul>
    );
  }
}

class VideoBookmark extends React.Component {
  constructor (props) {
    super(props);
  }

  bookmarkId () {
    return `bookmark${this.props.bookmark.id}`;
  }

  formattedTime () {
    return moment().startOf('day')
      .seconds(this.props.bookmark.time)
      .format('H:mm:ss');
  }

  bookmarkClasses () {
    if (this.props.bookmark.active) {
      return "bookmark bookmark--highlight";
    }
    return "bookmark";
  }

  changeVideoTime () {
    TT.videoPlayer.setVideoTime(this.props.bookmark.time);
  }

  render () {
    let boundClick = this.changeVideoTime.bind(this);
    return (
      <li className={this.bookmarkClasses()} id={this.bookmarkId()} onClick={boundClick}>
        {this.props.bookmark.description}
        <span className="bookmark__timestamp">{this.formattedTime()}</span>
      </li>
    );
  }
}

var videoBookmarksStore = (function () {
  const CHANGE_EVENT = 'bookmarks_change'

  let _bookmarks = {};
  let bookmarksArray = [];

  let init = function(bookmarks) {
    bookmarksArray = bookmarks.slice(0);
    bookmarks = _sortByTime(bookmarks);
    bookmarks.forEach(create);
    $(document).on(TT.videoPlayer.TIMECHANGE_EVENT, findClosestBookmark);
  }

  let create = function(bookmark) {
    _bookmarks[bookmark.id] = {
      id: bookmark.id,
      active: false,
      time: bookmark.time,
      description: bookmark.description
    }
    _addBookmarkEvents(bookmark);
  }

  let getAll = function() {
    return _bookmarks;
  }

  let setActive = function(event) {
    _inactivateAllBookmarks();
    _bookmarks[event.data.id].active = true;
    _emitChange()
  }

  let _inactivateAllBookmarks = function() {
    for (var id in _bookmarks) {
      _bookmarks[id].active = false;
    }
  }

  let _addBookmarkEvents = function(bookmark) {
    $(document).on(TT.videoPlayer.getEventName(bookmark.time), bookmark, setActive);
    $(document).on(TT.videoPlayer.getEventName(bookmark.time + 1), bookmark, setActive);
  }

  let _removeAllBookmarkEvents = function() {
    for (var id in _bookmarks) {
      $(document).off(TT.videoPlayer.getEventName(_bookmark[id].time), setActive);
      $(document).off(TT.videoPlayer.getEventName(_bookmark[id].time + 1), setActive);
    }
  }

  let _getEventName = function(time) {
    var roundedTime = Math.round(time);
    return 'PLAYER-TIME:' + roundedTime;
  }

  let _sortByTime = function(bookmarks) {
    return bookmarks.sort(_compare);
  }

  let _compare = function(a, b) {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  let _emitChange = function() {
    $(document).trigger(CHANGE_EVENT);
  }

  let addChangeListener = function(callback) {
    $(document).on(CHANGE_EVENT, callback);
  }

  let removeChangeListener = function(callback) {
    $(document).off(CHANGE_EVENT, callback);
    _removeAllBookmarkEvents();
  }

  let findClosestBookmark = function(e) {
    let currTime = e.data;
    var reverse = bookmarksArray.slice(0).reverse();
    for(var i = 0; i < reverse.length; i++) {
      if (reverse[i].time <= currTime) {
        setActive({data: reverse[i]});
        return true;
      }
    }
    return false;
  }

  return {
    init: init,
    create: create,
    getAll: getAll,
    setActive: setActive,
    addChangeListener: addChangeListener,
    removeChangeListener: removeChangeListener
  };
})();

