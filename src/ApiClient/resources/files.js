var fs = require('fs');

var path = '/files/';

module.exports = {
  getAllFiles: function(cb) {
    this._request('GET', path, cb);
  },

  getAllPendingFiles: function(cb) {
    this._request('GET', path + 'pending/', cb);
  },

  getAllOriginalFiles: function(cb) {
    this._request('GET', path + 'original/', cb);
  },

  importFileAsOriginal: function(filename, filepath, cb) {
    const body = {
      name: filename,
      file: fs.createReadStream(filepath)
    };

    this._request('POST', path + 'original/', body, cb);
  },

  downloadOriginalFile: function(fileid, cb) {
    this._request('GET', path + 'original/' + fileid + '/download/', cb);
  }
};
