var assert = require('assert');
var path = require('path');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('Signing Resource', function() {
  var client;
  var fileid;

  before(done => {
    var filename = 'test123' + Date.now() + '.pdf';

    client = new ApiClient({
      sandbox: process.env.NODE_ENV !== 'production',
      clientId: cfg.clientId,
      clientSecret: cfg.clientSecret,
      accessToken: cfg.accessToken,
      refreshToken: cfg.refreshToken,
      onTokenRefresh: () => {}
    });

    client.importFileAsOriginal(
      filename,
      path.join(__dirname, '/../files/test123.pdf'),
      (err, res) => {
        if (err) {
          done(err);
          return;
        }

        fileid = res.id;

        done();
      }
    );
  });

  it('should get a signing url for a file', function(done) {
    client.getSigningUrl(fileid, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      // file_id comes back as string from API
      assert.ok(res.file_id == fileid); // eslint-disable-line eqeqeq
      assert.ok('url' in res);
      done();
    });
  });
});
