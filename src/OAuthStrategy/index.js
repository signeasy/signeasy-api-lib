var util = require('util');
var OAuth2Strategy = require('passport-oauth2');
var request = require('request');
var qs = require('querystring');
var cfg = require('../config');
// const { Console } = require('console');

function Strategy(options, verify) {
  var opts = options || {};

  console.log('OAuth2Strategy', opts);
  
  // this._sandbox = opts.sandbox;
  // this._baseUrl = opts.sandbox ? cfg.sandbox_baseurl : cfg.baseurl;
  this._baseUrl = opts.baseURL || cfg.baseURL;

  opts.authorizationURL = this._baseUrl + '/oauth2/authorize';
  opts.tokenURL = this._baseUrl + '/oauth2/token';

  opts.scopeSeparator = opts.scopeSeparator || ',';

  OAuth2Strategy.call(this, opts, verify);

  this.name = 'signeasy';

  this._oauth2._executeRequest = function(httpLib, ops, postBody, callback) {
    var callbackCalled = false;
    var postparams = JSON.parse(JSON.stringify(qs.parse(postBody)));

    console.log('_oauth2 req', postparams);
    if(ops.host == 'localhost') {
      ops.host = ops.host + ':9090'; // localhost running se_oauth service at port 9090
    }
    
    var reqOptions = {
      url: 'https://' + ops.host + ops.path,
      json: true,
      formData: postparams
    };

    function passBackControl(response, result) {
      console.log('passBackControl result', result);
      if (!callbackCalled) {
        callbackCalled = true;
        if (
          !(response.statusCode >= 200 && response.statusCode <= 299) &&
          response.statusCode !== 301 &&
          response.statusCode !== 302
        ) {
          callback({ statusCode: response.statusCode, data: result });
        } else {
          callback(null, result, response);
        }
      }
    }

    console.log('reqOptions', reqOptions);
    request.post(reqOptions, function(error, response, body) {
      if (error) {
        callbackCalled = true;
        callback(error);
        return;
      }

      passBackControl(response, JSON.stringify(body));
    });
  };
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

// Expose constructor.
module.exports = Strategy;
