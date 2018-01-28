var util = require('../../util');

var path = '/callback/urls/';

module.exports = {
  getCallbackUrls: function(clientId, cb) {
    var headers = util.getClientHeader(clientId);

    this._request('GET', path, undefined, headers, cb);
  },

  createCallbackUrls: function(clientId, urls, cb) {
    var headers = util.getClientHeader(clientId);

    var body = {
      urls: urls.join(',')
    };

    this.request('POST', path, body, headers, cb);
  },

  deleteCallbackUrls: function(clientId, urls, cb) {
    var headers = util.getClientHeader(clientId);

    var body = {
      urls: urls.join(',')
    };

    this.request('DELETE', path, body, headers, cb);
  }
};
