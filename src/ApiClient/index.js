var request = require('request');
var cfg = require('../config');
var resources = require('./resources');

function ApiClient(options) {
  options = options || {};

  if (!options.clientId) {
    throw new Error('`clientId` needs to be passed to initialize ApiClient');
  }

  if (!options.clientSecret) {
    throw new Error(
      '`clientSecret` needs to be passed to initialize ApiClient'
    );
  }

  if (!options.accessToken) {
    throw new Error('`accessToken` needs to be passed to initialize ApiClient');
  }

  if (!options.refreshToken) {
    throw new Error(
      '`refreshToken` needs to be passed to initialize ApiClient'
    );
  }

  if (!options.onTokenRefresh) {
    throw new Error(
      '`onTokenRefresh` needs to be passed to initialize ApiClient'
    );
  }

  if (typeof options.onTokenRefresh !== 'function') {
    throw new Error('`onTokenRefresh` needs to be a function');
  }

  this._sandbox = options.sandbox || false;
  this._version = options.version || cfg.version;
  this._baseurl =
    (options.sandbox ? cfg.sandbox_baseurl : cfg.baseurl) + '/' + this._version;

  this._clientId = options.clientId;
  this._clientSecret = options.clientSecret;
  this._accessToken = options.accessToken;
  this._refreshToken = options.refreshToken;
  this._onTokenRefresh = options.onTokenRefresh;
}

ApiClient.prototype = {
  setAccessToken: function(accessToken) {
    if (accessToken) {
      this._accessToken = accessToken;
    }
  },

  _request: function(method, path, body, headers, cb) {
    var baseHeaders = {
      'X-Client-Id': this._clientId,
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
      throw new Error('Callback not passed');
    }

    baseHeaders = Object.assign({}, baseHeaders, headers);

    request(
      {
        method: method,
        url: this._baseurl + path,
        headers: baseHeaders,
        json: true,
        formData: body
      },
      function(err, response, responseBody) {
        if (err) {
          cb(err);
          return;
        }

        cb(null, responseBody);
      }
    );
  }
};

// Add methods from resources on ApiClient prototype
Object.keys(resources).forEach(function(resource) {
  Object.keys(resources[resource]).forEach(function(method) {
    ApiClient.prototype[method] = resources[resource][method];
  });
});

module.exports = ApiClient;
