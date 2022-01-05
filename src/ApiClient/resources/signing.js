var path = '/signing/';

module.exports = {
  getSigningUrl: function(fileId, cb) {
    var body = {
      file_id: fileId
    };

    this._request('POST', path + 'url/', body, cb);
  }
};
