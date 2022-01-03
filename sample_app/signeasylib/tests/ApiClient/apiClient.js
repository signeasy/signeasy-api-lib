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

  it('should fail when clientId is not passed', function(done) {
    try {
      client = new ApiClient({
        sandbox: process.env.NODE_ENV !== 'production',
        clientSecret: cfg.clientSecret,
        accessToken: cfg.accessToken,
        refreshToken: cfg.refreshToken,
        onTokenRefresh: () => {}
      });
      assert.ok(false);
    } catch (err) {
      assert.ok(err);
    }
    done();
  });

  it('should fail when clientSecret is not passed', function(done) {
    try {
      client = new ApiClient({
        sandbox: process.env.NODE_ENV !== 'production',
        clientId: cfg.clientId,
        accessToken: cfg.accessToken,
        refreshToken: cfg.refreshToken,
        onTokenRefresh: () => {}
      });
      assert.ok(false);
    } catch (err) {
      assert.ok(err);
    }
    done();
  });

  it('should fail when accessToken is not passed', function(done) {
    try {
      client = new ApiClient({
        sandbox: process.env.NODE_ENV !== 'production',
        clientId: cfg.clientId,
        clientSecret: cfg.clientSecret,
        refreshToken: cfg.refreshToken,
        onTokenRefresh: () => {}
      });
      assert.ok(false);
    } catch (err) {
      assert.ok(err);
    }
    done();
  });

  it('should fail when refreshToken is not passed', function(done) {
    try {
      client = new ApiClient({
        sandbox: process.env.NODE_ENV !== 'production',
        clientId: cfg.clientId,
        clientSecret: cfg.clientSecret,
        accessToken: cfg.accessToken,
        onTokenRefresh: () => {}
      });
      assert.ok(false);
    } catch (err) {
      assert.ok(err);
    }
    done();
  });

  // it('should fail when onTokenRefresh is not passed', function(done) {
  //   try {
  //     client = new ApiClient({
  //       sandbox: process.env.NODE_ENV !== 'production',
  //       clientId: cfg.clientId,
  //       clientSecret: cfg.clientSecret,
  //       accessToken: cfg.accessToken,
  //       refreshToken: cfg.refreshToken
  //     });
  //     assert.ok(false);
  //   } catch (err) {
  //     assert.ok(err);
  //   }
  //   done();
  // });

  // it('should fail if onTokenRefresh is not a function', function(done) {
  //   try {
  //     client = new ApiClient({
  //       sandbox: process.env.NODE_ENV !== 'production',
  //       clientId: cfg.clientId,
  //       clientSecret: cfg.clientSecret,
  //       accessToken: cfg.accessToken,
  //       refreshToken: cfg.refreshToken,
  //       onTokenRefresh: 'function'
  //     });
  //     assert.ok(false);
  //   } catch (err) {
  //     assert.ok(err);
  //   }
  //   done();
  // });
});
