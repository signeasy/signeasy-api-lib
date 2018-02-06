var assert = require('assert');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('Auth Resource', function() {
  var client;

  before(() => {
    client = new ApiClient({
      sandbox: process.env.NODE_ENV !== 'production',
      clientId: cfg.clientId,
      clientSecret: cfg.clientSecret,
      accessToken: cfg.accessToken,
      refreshToken: cfg.refreshToken,
      onTokenRefresh: () => {}
    });
  });

  it.skip('should refresh the access token', function(done) {
    client.refreshToken((err, response) => {
      if (err) {
        assert.ok(false);
      }

      assert.ok(response.refresh_token);
      assert.ok(response.access_token);
      done();
    });
  });
});
