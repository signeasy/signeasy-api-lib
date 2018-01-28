var fs = require('fs');

var path = '/files/';

module.exports = {
  getAllFiles: function(cb) {
    this._request('GET', path, cb);
  },

  importFileAsOriginal: function(filename, filepath, cb) {
    const body = {
      name: filename,
      file: fs.createReadStream(filepath)
    };

    this.request('POST', path + 'original/', body, cb);
  }
};
