const port = 3000;
const baseUrl = process.env.NOW
  ? 'https://sepocsdk.now.sh'
  : `http://localhost:${port}`;

const config = {
  baseUrl,
  port,
  appUrl: baseUrl,
  authorizationURL: 'https://api-ext.getsigneasy.com/oauth2/authorize',
  tokenURL: 'https://api-ext.getsigneasy.com/oauth2/token',
  clientID: '4V82IhI149OX5zyBMcYvnTq9vD9FXpS2sV9XK2ec',
  clientSecret: 'hH5N09kt9QelP9gCONMzHbPHA6QjQUT625yjoFdeZsEfq6Zfrk',
  callbackURL: `${baseUrl}/auth/cb`
};

module.exports = config;
