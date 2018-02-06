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

  it('should throw error when callback not passed', function(done) {
    try {
      client.getProfile();
      assert.ok(false);
    } catch (err) {
      assert.ok(err);
    }

    done();
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

  it('should throw error when baseurl is invalid', function(done) {
    client._baseurl = 'signeasy';
    client.getProfile(err => {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }

      done();
    });
  });
});
