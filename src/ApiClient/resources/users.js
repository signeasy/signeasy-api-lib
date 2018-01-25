var path = '/user/';

module.exports = {
  getProfile: function(cb) {
    this._request('GET', path, cb);
  }
};
