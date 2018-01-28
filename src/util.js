function getClientHeader(clientId) {
  return {
    'X-Client-Id': clientId
  };
}

module.exports = {
  getClientHeader: getClientHeader
};
