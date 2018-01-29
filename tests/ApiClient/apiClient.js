var assert = require('assert');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('apiClient', function() {
  it('should initialize', function(done) {
    var client = new ApiClient({
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
