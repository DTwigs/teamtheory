

class VideoBookmarks extends React.Component {
  constructor (props) {
    super(props);
    videoBookmarksStore.init(this.props.bookmarks, this.props.types);
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
        bookmarks.push((<VideoBookmark bookmark={allBookmarks[id]} key={id} types={videoBookmarksStore.getBookmarkTypes()}></VideoBookmark>));
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

  getIcon () {
    let iconType;

    if (this.props.bookmark.video_bookmark_type_id) {
      iconType = this.props.types[this.props.bookmark.video_bookmark_type_id].identifier.toLowerCase();
    }

    switch (iconType) {
      case "smoke":
        return (
          <div className="bookmark__icon-container icon-tilted">
            <IconSmoke></IconSmoke>
          </div>
        );
        break;
      case "flash":
        return (
          <div className="bookmark__icon-container icon-tilted">
            <IconFlash></IconFlash>
          </div>
        );
        break;
      case "fire":
        return (
          <div className="bookmark__icon-container icon-tilted">
            <IconFire></IconFire>
          </div>
        );
        break;
      default:
        return (
          <div className="bookmark__empty-container"></div>
        );
    }
  }

  render () {
    let boundClick = this.changeVideoTime.bind(this);
    return (
      <li className={this.bookmarkClasses()} id={this.bookmarkId()} onClick={boundClick}>
        {this.getIcon()}
        {this.props.bookmark.description}
        <span className="bookmark__timestamp">{this.formattedTime()}</span>
      </li>
    );
  }
}

class ActiveVideoBookmark extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.getActiveBookmarkState();
  }

  getActiveBookmarkState () {
    return {
      bookmark: videoBookmarksStore.getActiveBookmark()
    };
  }

  getIconType () {
    let types = videoBookmarksStore.getBookmarkTypes()

    if (this.state.bookmark.video_bookmark_type_id) {
      return types[this.state.bookmark.video_bookmark_type_id].identifier.toLowerCase();
    }

    return null;
  }

  _onChange () {
    this.setState(this.getActiveBookmarkState());
  }

  _changeVideoTime () {
    TT.videoPlayer.setVideoTime(this.state.bookmark.time);
  }

  componentDidMount () {
    videoBookmarksStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    videoBookmarksStore.removeChangeListener(this._onChange.bind(this));
  }

  getIcon () {
    let iconType = this.getIconType();

    switch (iconType) {
      case "smoke":
        return (
          <IconSmoke dark={true}></IconSmoke>
        );
        break;
      case "flash":
        return (
          <IconFlash dark={true}></IconFlash>
        );
        break;
      case "fire":
        return (
          <IconFire dark={true}></IconFire>
        );
        break;
    }
  }

  render () {
    if (this.state.bookmark) {
      let boundClick = this._changeVideoTime.bind(this);
      return (
        <div className="theater-controls">
          <div className="theater-controls__icon">
            {this.getIcon()}
          </div>
          <div className="theater-controls__control">
            <label className="theater-helper__text-label">
              Current Step
            </label>
            <div className="theater-helper__text">
              <a className="theater-helper__link" onClick={boundClick}>
                {this.state.bookmark.description}
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

var videoBookmarksStore = (function () {
  const CHANGE_EVENT = 'bookmarks_change'

  let _bookmarks = {};
  let _activeBookmark = {};
  let _bookmarkTypes = {};

  let init = function(bookmarks, bookmarkTypes) {
    bookmarks = _sortByTime(bookmarks);
    bookmarks.forEach(create);
    _createTypesObject(bookmarkTypes);
    $(document).on(TT.videoPlayer.TIMECHANGE_EVENT, findClosestBookmark);
  }

  let create = function(bookmark) {
    _bookmarks[bookmark.id] = {
      id: bookmark.id,
      active: false,
      time: bookmark.time_in_seconds,
      description: bookmark.description,
      video_bookmark_type_id: bookmark.video_bookmark_type_id
    }
    _addBookmarkEvents(_bookmarks[bookmark.id]);
  }

  let getAll = function() {
    return _bookmarks;
  }

  let getActiveBookmark = function () {
    return _activeBookmark;
  }

  let getBookmarkTypes = function() {
    return _bookmarkTypes;
  }

  let setActive = function(event) {
    _inactivateAllBookmarks();
    _activeBookmark = _bookmarks[event.data.id];
    _activeBookmark.active = true;
    _emitChange();
  }

  let _createTypesObject = function(types) {
    types.forEach(function(t) {
      _bookmarkTypes[t.id] = t;
    });
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

  let findClosestBookmark = function(e, currTime) {
    // let currTime = e.data;

    for (var id in _bookmarks) {
      id = parseInt(id);
      if (_bookmarks[id].time > currTime) {
        let activeBookmark = _bookmarks[id - 1];
        setActive({data: activeBookmark});
        return true;
      } else if (!_bookmarks[id + 1]) { // last bookmark
        let activeBookmark = _bookmarks[id];
        setActive({data: activeBookmark});
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
    getActiveBookmark: getActiveBookmark,
    getBookmarkTypes: getBookmarkTypes,
    addChangeListener: addChangeListener,
    removeChangeListener: removeChangeListener
  };
})();

