var request = require('request');
var cfg = require('../config');
var Users = require('./users');

function ApiClient(options) {
  this._sandbox = options.sandbox || false;
  this._accessToken = options.accessToken;
  this._refreshToken = options.refreshToken;
  this._onTokenRefresh = options.onTokenRefresh;
  this._baseurl = options.sandbox ? cfg.sandbox_baseurl : cfg.baseurl;

  Users.call(this);
}

ApiClient.prototype.users = new Users();

ApiClient.prototype._request = function(method, path, body, headers, cb) {
  var baseHeaders = {
    Authorization: 'Bearer ' + this._accessToken
  };

  if (arguments.length === 3) {
    cb = body;
    body = {};
    headers = {};
  }

  if (arguments.length === 4) {
    cb = headers;
    headers = {};
  }

  if (typeof cb !== 'function') {
    throw new Error('callback not passed');
  }

  baseHeaders = Object.assign({}, baseHeaders, headers);

  request(
    {
      method: method,
      url: this._baseurl + path,
      headers: baseHeaders
    },
    function(err, response, responseBody) {
      if (err) {
        cb(err);
        return;
      }

      cb(null, JSON.parse(responseBody));
    }
  );
};

module.exports = ApiClient;
