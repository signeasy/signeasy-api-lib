function Users() {
  this._path = '/user';
}

Users.prototype.getUser = function(cb) {
  this._request('GET', this._path, cb);
};

module.exports = Users;
