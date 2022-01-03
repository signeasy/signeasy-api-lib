var ApiClient = require('../../app').ApiClient;
var cfg = require('../config');

describe('Template Resource', function() {
  var client;
  var templateId;

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

  it('should fetch all templates of user', function(done) {
    client.getAllTemplates((err, templates) => {
      if (err) {
        done(err);
        return;
      }

      if (templates.length) {
        templateId = templates[0].id;
      }

      done();
    });
  });

  it('should fetch a template id', function(done) {
    if (!templateId) {
      this.skip('No template id found for this test');
    }

    client.getTemplate(templateId, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });
});
