var assert = require('assert');
var ApiClient = require('../../app').ApiClient;
var cfg = require('../config');

describe('Auth Resource', function() {
  var client;

  before(() => {
    client = new ApiClient({
      sandbox: process.env.NODE_ENV !== 'production',
      // clientId: cfg.clientId,
      // clientSecret: cfg.clientSecret,
      accessToken: cfg.accessToken,
      refreshToken: cfg.refreshToken,
      onTokenRefresh: () => {}
    });
  });

  // Refreshing the token will cause other tests in pipeline to fail
  // Because the access_token which is already exported & be used for other test suites
  // will no longer be valid
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
