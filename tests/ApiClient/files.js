var assert = require('assert');
var path = require('path');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('File Resource', function() {
  var client;
  var fileid;

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

  it('should import new file as original', function(done) {
    var filename = 'test123' + Date.now() + '.pdf';

    client.importFileAsOriginal(
      filename,
      path.join(__dirname, '/../files/test123.pdf'),
      (err, res) => {
        if (err) {
          done(err);
          return;
        }

        assert.ok(res.name === filename);
        fileid = res.id;
        done();
      }
    );
  });

  it('should fetch all files of user', function(done) {
    client.getAllFiles((err, files) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok('count' in files);
      done();
    });
  });

  it('should fetch all pending files of user', function(done) {
    client.getAllPendingFiles((err, files) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok('count' in files);
      done();
    });
  });

  it('should fetch all original files of user', function(done) {
    client.getAllOriginalFiles((err, files) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok('count' in files);
      done();
    });
  });

  it('should download original file', function(done) {
    client.downloadOriginalFile(fileid, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(res);
      done();
    });
  });

  it('should fail to download original file with incorrect fileid', function(done) {
    client.downloadOriginalFile(123, err => {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }

      done();
    });
  });
});
