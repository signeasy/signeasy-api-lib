var assert = require('assert');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('Api Client', function() {
  var client;

  it('should initialize', function(done) {
    client = new ApiClient({
      sandbox: process.env.NODE_ENV !== 'production',
      clientId: cfg.clientId,
      clientSecret: cfg.clientSecret,
      accessToken: cfg.accessToken,
      refreshToken: cfg.refreshToken,
      onTokenRefresh: () => {}
    });

    assert.ok(client instanceof ApiClient);
    assert.ok(client._clientId === cfg.clientId);
    done();
  });
});
