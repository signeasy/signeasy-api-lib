var fs = require('fs');

var path = '/files/';
var originalFilePath = '/files/original/';
var signedFilePath = '/files/signed/';
var pendingFilePath = '/files/pending/';

module.exports = {
  // All Files
  getAllFiles: function(cb) {
    this._request('GET', path, cb);
  },

  // Originals File API
  importFileAsOriginal: function(filename, filepath, cb) {
    var body = {
      name: filename,
      file: fs.createReadStream(filepath)
    };

    this._request('POST', originalFilePath, body, cb);
  },

  getAllOriginalFiles: function(cb) {
    this._request('GET', originalFilePath, cb);
  },

  getOriginalFile: function(fileId, cb) {
    this._request('GET', originalFilePath + fileId + '/', cb);
  },

  downloadOriginalFile: function(fileid, cb) {
    this._request('GET', originalFilePath + fileid + '/download/', cb);
  },

  updateOriginalFileName: function(fileId, filename, cb) {
    var body = {
      name: filename
    };

    this._request('PUT', originalFilePath + fileId + '/', body, cb);
  },

  deleteOriginalFile: function(fileid, cb) {
    this._request('DELETE', originalFilePath + fileid + '/', cb);
  },

  // Signed Files API
  getAllSignedFiles: function(cb) {
    this._request('GET', signedFilePath, cb);
  },

  getSignedFile: function(fileId, cb) {
    this._request('GET', signedFilePath + fileId + '/', cb);
  },

  downloadSignedFile: function(fileid, cb) {
    this._request('GET', signedFilePath + fileid + '/download/', cb);
  },

  updateSignedFileName: function(fileId, filename, cb) {
    var body = {
      name: filename
    };

    this._request('PUT', signedFilePath + fileId + '/', body, cb);
  },

  deleteSignedFile: function(fileid, cb) {
    this._request('DELETE', signedFilePath + fileid + '/', cb);
  },

  // Pending Files API
  getAllPendingFiles: function(cb) {
    this._request('GET', pendingFilePath, cb);
  },

  initiateSignatureRequest: function(data, cb) {
    const headers = {
      'Content-Type': 'application/json'
    };

    this._request('POST', pendingFilePath, data, headers, cb);
  },

  remindAboutSignatureRequest: function(fileid, msg, cb) {
    var data = {};

    if (arguments.length === 2) {
      cb = msg;
      msg = undefined;
    }

    if (msg) {
      data.message = msg;
    }

    this._request('POST', pendingFilePath + fileid + '/remind/', data, cb);
  },

  declineSignatureRequest: function(fileid, msg, cb) {
    var data = {};

    if (arguments.length === 2) {
      cb = msg;
      msg = undefined;
    }

    if (msg) {
      data.message = msg;
    }

    this._request('POST', pendingFilePath + fileid + '/decline/', data, cb);
  },

  cancelSignatureRequest: function(fileid, msg, cb) {
    var data = {};

    if (arguments.length === 2) {
      cb = msg;
      msg = undefined;
    }

    if (msg) {
      data.message = msg;
    }

    this._request('POST', pendingFilePath + fileid + '/cancel/', data, cb);
  },

  getPendingFile: function(fileid, cb) {
    this._request('GET', pendingFilePath + fileid + '/', cb);
  }
};
