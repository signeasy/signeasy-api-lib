var assert = require('assert');
var qs = require('querystring');
var OAuthStrategy = require('../../src').OAuthStrategy;
var cfg = require('../config');

describe('OAuth Strategy', function() {
  var strategy;

  it('should initialize', function(done) {
    strategy = new OAuthStrategy(
      {
        sandbox: process.env.NODE_ENV !== 'production',
        clientID: cfg.clientId,
        clientSecret: cfg.clientSecret
      },
      () => {}
    );

    assert.ok(strategy instanceof OAuthStrategy);
    assert.ok(strategy.name === 'signeasy');
    done();
  });

  it('should throw error when baseurl is invalid', function(done) {
    var options = {};

    var body = qs.stringify({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: cfg.refreshToken
    });

    options.host = strategy._baseUrl;
    options.path = '/oauth2/token';

    strategy = new OAuthStrategy(
      {
        sandbox: process.env.NODE_ENV !== 'production',
        clientID: cfg.clientId,
        clientSecret: cfg.clientSecret
      },
      () => {}
    );

    strategy._oauth2._executeRequest(undefined, options, body, err => {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }

      done();
    });
  });

  it('should throw error when unauthorized', function(done) {
    var options = {};

    var body = qs.stringify({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: cfg.refreshToken
    });

    options.host = strategy._baseUrl.replace('https://', '');
    options.path = '/oauth/token';

    strategy = new OAuthStrategy(
      {
        sandbox: process.env.NODE_ENV !== 'production',
        clientID: cfg.clientId,
        clientSecret: cfg.clientSecret
      },
      () => {}
    );

    strategy._oauth2._executeRequest(undefined, options, body, err => {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }

      done();
    });
  });

  it('should execute multipart request', function(done) {
    var options = {};

    var body = qs.stringify({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: cfg.refreshToken
    });

    options.host = strategy._baseUrl.replace('https://', '');
    options.path = '/oauth2/token';

    strategy = new OAuthStrategy(
      {
        sandbox: process.env.NODE_ENV !== 'production',
        clientID: cfg.clientId,
        clientSecret: cfg.clientSecret
      },
      () => {}
    );

    strategy._oauth2._executeRequest(undefined, options, body, (err, res) => {
      var response;

      if (err) {
        done(err);
        return;
      }

      response = JSON.parse(res);
      assert.ok(response.refresh_token);
      assert.ok(response.access_token);
      done();
    });
  });
});
