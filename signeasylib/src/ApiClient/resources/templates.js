var path = '/library/template/';

module.exports = {
  getAllTemplates: function(cb) {
    this._request('GET', path, cb);
  },

  getTemplate: function(templateId, cb) {
    this._request('GET', path + templateId + '/', cb);
  }
};
