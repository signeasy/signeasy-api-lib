const port = 3000;

let baseUrl = 'http://localhost:3000';
let apiExtBaseUrl = 'http://localhost:9090';

if (process.env.NODE_ENV === 'dev') {
  baseUrl = 'https://api-demo-dev.signeasy.com';
  apiExtBaseUrl = 'https://api-ext-dev.signeasy.com';
} else if (process.env.NODE_ENV === 'pre_prod') {
  baseUrl = 'https://api-demo-preprod.signeasy.com';
  apiExtBaseUrl = 'https://api-ext-preprod.signeasy.com';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api-demo.getsigneasy.com';
  apiExtBaseUrl = 'https://api-ext.getsigneasy.com';
}

const config = {
  baseUrl,
  port,
  appUrl: baseUrl,
  apiExtBaseUrl,
  authorizeClientURL: `${apiExtBaseUrl}/oauth2/authorize_client`,
  authorizationURL: `${apiExtBaseUrl}/oauth2/authorize`,
  tokenURL: `${apiExtBaseUrl}/oauth2/token`,
  callbackURL: `${baseUrl}/client/cb`,
  authCallbackURL: `${baseUrl}/auth/cb`,
  accessTokenTTL: 2592000
};

module.exports = config;