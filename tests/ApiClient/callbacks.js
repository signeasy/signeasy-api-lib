var assert = require('assert');
var ApiClient = require('../../app').ApiClient;
var cfg = require('../config');

describe('Callback Resource', function() {
  var client;

  var urls = ['http://localhost:9000', 'https://api.getsigneasy.io'];

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

  it('should create few callback urls for the client', function(done) {
    client.createCallbackUrls(urls, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(res.callback_urls.indexOf('https://api.getsigneasy.io') > -1);
      done();
    });
  });

  it('should fetch all callback urls of the client', function(done) {
    client.getCallbackUrls((err, res) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(res.callback_urls.indexOf('https://api.getsigneasy.io') > -1);
      done();
    });
  });

  it('should delete few callback urls of the client', function(done) {
    client.deleteCallbackUrls(['https://api.getsigneasy.io'], (err, res) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(res.callback_urls.indexOf('https://api.getsigneasy.io') === -1);
      done();
    });
  });
});
