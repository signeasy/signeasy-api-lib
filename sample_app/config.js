const port = 3000;
const baseUrl = 'https://api-demo.getsigneasy.com';

const config = {
  baseUrl,
  port,
  appUrl: baseUrl,
  authorizationURL: 'https://api-ext.getsigneasy.com/oauth2/authorize',
  tokenURL: 'https://api-ext.getsigneasy.com/oauth2/token',
  clientID: 'fiuLeRRIouFMXblt1keYYbPPbeelFjdOqC7kPmmo',
  clientSecret: 'J5UvQ41IUhaXpHGggpY0GUDF9tgz3hzDIw1koPnrcYED87dqm6',
  callbackURL: `${baseUrl}/auth/cb`
};

module.exports = config;
