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
  // setAccessToken: (accessToken) => {
  //   if (accessToken) {
  //     this._accessToken = accessToken;
  //   }
  // },

  // setRefreshToken: (refreshToken) => {
  //   if (refreshToken) {
  //     this._refreshToken = refreshToken;
  //   }
  // },

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

        // if (response.statusCode === 401) {
        //   this.refreshToken((err2, res) => {
        //     if (err2) {
        //       cb(err2);
        //       return;
        //     }

        //     this.setAccessToken(res.access_token);
        //     this.setRefreshToken(res.refresh_token);

        //     // Fire the same call again
        //     this._request(method, path, body, headers, cb);

        //     // Call back the user specified `onTokenRefresh` hook
        //     this._onTokenRefresh(res.access_token, res.refresh_token);
        //   });

        //   return;
        // }

        if (
          !(response.statusCode >= 200 && response.statusCode <= 299) &&
          response.statusCode !== 301 &&
          response.statusCode !== 302
        ) {
          cb(responseBody);
          return;
        }

        cb(null, responseBody);
      }
    );
  },

  _requestOauth: function(method, path, body, headers, cb) {
    var oauthUrl = this._baseurl.replace(this._version, 'oauth2');
    var baseHeaders = {};

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
        url: oauthUrl + path,
        headers: baseHeaders,
        json: true,
        formData: body
      },
      function(err, response, responseBody) {
        if (err) {
          cb(err);
          return;
        }

        if (
          !(response.statusCode >= 200 && response.statusCode <= 299) &&
          response.statusCode !== 301 &&
          response.statusCode !== 302
        ) {
          cb(responseBody);
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
