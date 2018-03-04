var path = '/user/';

module.exports = {
  getProfile: function(cb) {
    this._request('GET', path, cb);
  },

  createUser: function(data, cb) {
    this._request('POST', path, data, cb);
  }
};
