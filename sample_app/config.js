const port = 3000;
const baseUrl = process.env.NOW
  ? 'https://sepocsdk.now.sh'
  : `http://localhost:${port}`;

const config = {
  baseUrl,
  port,
  appUrl: baseUrl,
  authorizationURL: 'https://api-ext-dev.getsigneasy.com/oauth2/authorize',
  tokenURL: 'https://api-ext-dev.getsigneasy.com/oauth2/token',
  clientID: '07biLc2vH7Ze3PrbtfkipAJspsqoOS0yZBdqKDjV',
  clientSecret: 'eJMHT106B551M5Kpm5oqrjj8Lt3ozcI0Sn7USxLrmktxQgnceE',
  callbackURL: `${baseUrl}/auth/cb`
};

module.exports = config;
