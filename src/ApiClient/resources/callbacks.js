var path = '/callback/urls/';

module.exports = {
  getCallbackUrls: function(cb) {
    this._request('GET', path, cb);
  },

  createCallbackUrls: function(urls, cb) {
    var body = {
      urls: urls.join(',')
    };

    this.request('POST', path, body, cb);
  },

  deleteCallbackUrls: function(urls, cb) {
    var body = {
      urls: urls.join(',')
    };

    this.request('DELETE', path, body, cb);
  }
};
