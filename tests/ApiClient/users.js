var assert = require('assert');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('User Resource', function() {
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

  it('should fetch user', function(done) {
    client.getProfile((err, profile) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(profile.id);
      done();
    });
  });
});
