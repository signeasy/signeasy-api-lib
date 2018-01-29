var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('File Resource', function() {
  var client;

  beforeEach(() => {
    client = new ApiClient({
      sandbox: process.env.NODE_ENV !== 'production',
      clientId: cfg.clientId,
      clientSecret: cfg.clientSecret,
      accessToken: cfg.accessToken,
      refreshToken: cfg.refreshToken,
      onTokenRefresh: () => {}
    });
  });

  it('should fetch all files of user', function(done) {
    client.getAllFiles(err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });
});
