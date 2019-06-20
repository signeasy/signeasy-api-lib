const port = 3000;

const baseUrl = 'https://api-keys.signeasy.com';

const config = {
  baseUrl,
  port,
  appUrl: baseUrl,
  authorizationURL: 'https://api-ext.signeasy.com/oauth2/authorize',
  tokenURL: 'https://api-ext.signeasy.com/oauth2/token',
  clientID: 'fiuLeRRIouFMXblt1keYYbPPbeelFjdOqC7kPmmo',
  clientSecret: 'J5UvQ41IUhaXpHGggpY0GUDF9tgz3hzDIw1koPnrcYED87dqm6',
  callbackURL: `${baseUrl}/auth/cb`,
  accessTokenTTL: 2592000
};

module.exports = config;
