var assert = require('assert');
var path = require('path');
var ApiClient = require('../../src').ApiClient;
var cfg = require('../config');

describe('File Resource', function() {
  var client;
  var originalFileId;
  var signedFileId;
  var pendingFileId;

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
        originalFileId = res.id;
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

  it('should fetch a original file by file id', function(done) {
    client.getOriginalFile(originalFileId, (err, file) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(file.id === originalFileId);
      done();
    });
  });

  it('should download original file', function(done) {
    client.downloadOriginalFile(originalFileId, (err, res) => {
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

  it('should update the filename of already uploaded original file', function(done) {
    var newFilename = 'new' + Date.now() + '.pdf';

    client.updateOriginalFileName(originalFileId, newFilename, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it('should fetch all signed files', function(done) {
    client.getAllSignedFiles((err, files) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok('count' in files);

      if (files.files.length) {
        signedFileId = files.files[0].id;
      }
      done();
    });
  });

  it('should fetch a signed file by file id', function(done) {
    if (!signedFileId) {
      this.skip('No signed files avaialable for testing under this account');
    }

    client.getSignedFile(signedFileId, (err, file) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(file.id === signedFileId);
      done();
    });
  });

  it('should download signed file', function(done) {
    if (!signedFileId) {
      this.skip('No signed files avaialable for testing under this account');
    }

    client.downloadSignedFile(signedFileId, (err, res) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok(res);
      done();
    });
  });

  it('should fail to download signed file with incorrect fileid', function(done) {
    client.downloadSignedFile(123, err => {
      if (err) {
        assert.ok(true);
      } else {
        assert.ok(false);
      }

      done();
    });
  });

  it('should update the filename of already uploaded signed file', function(done) {
    var newFilename = 'new' + Date.now() + '.pdf';

    if (!signedFileId) {
      this.skip('No signed files avaialable for testing under this account');
    }

    client.updateSignedFileName(signedFileId, newFilename, err => {
      if (err) {
        done(err);
        return;
      }

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

  it('should initiate a request signature', function(done) {
    var data = {
      recipients: [
        {
          email: 'test@getsigneasy.com',
          first_name: 'test',
          last_name: 'signeasy'
        }
      ],
      original_file_id: originalFileId,
      is_ordered: 1
    };

    client.initiateSignatureRequest(data, (err, response) => {
      if (err) {
        done(err);
        return;
      }

      assert.ok('pending_file_id' in response);
      pendingFileId = response.pending_file_id;
      done();
    });
  });

  it('should remind about a signature request', function(done) {
    client.remindAboutSignatureRequest(pendingFileId, 'Please sign', err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it.skip('should decline a signature request', function(done) {
    client.declineSignatureRequest(pendingFileId, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it('should cancel a signature request', function(done) {
    client.cancelSignatureRequest(pendingFileId, 'I want to cancel', err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it('should fetch a pending file', function(done) {
    client.getPendingFile(pendingFileId, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it('should delete the original file', function(done) {
    client.deleteOriginalFile(originalFileId, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });

  it('should delete the signed file', function(done) {
    if (!signedFileId) {
      this.skip('No signed files avaialable for testing under this account');
    }

    client.deleteSignedFile(signedFileId, err => {
      if (err) {
        done(err);
        return;
      }

      done();
    });
  });
});
