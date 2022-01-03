module.exports = {
  refreshToken: function(cb) {
    var body = {
      client_id: this._clientId,
      client_secret: this._clientSecret,
      grant_type: 'refresh_token',
      refresh_token: this._refreshToken
    };

    this._requestOauth('POST', '/token', body, cb);
  }
};
