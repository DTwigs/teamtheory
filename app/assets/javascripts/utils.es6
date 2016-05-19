TT.Utils = (function() {
  function setQueryStringParameter(key, value) {
    let uri = window.location.origin + window.location.pathname;
    let uriWithParams = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uriWithParams.indexOf('?') !== -1 ? "&" : "?";
    let newUrl;
    if (uriWithParams.match(re)) {
      newUrl = uriWithParams.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      newUrl = uri + separator + key + "=" + value;
    }

    if (history.pushState) {
      window.history.pushState({path: newUrl},'',newUrl);
    }
  }

  function getQueryStringParameter(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  return {
    setQueryStringParameter: setQueryStringParameter,
    getQueryStringParameter: getQueryStringParameter
  }
})();

