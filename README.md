# Node SDK for SignEasy [BETA]

A node sdk client for Signeasy API which will simplify the integration of Signeasy Authentication & APIs in your Express based Node web apps.

### Requirements
Node 4 or above

### Installation
Using NPM
```
npm i signeasy --save
```

### Usage
This SDK contains 2 modules. One is a OAuth2 based custom passport-strategy for authentication of Signeasy users. Authentication will be needed to retreive `accessToken` & `refreshToken`.

#### Passport.js based Signeasy's OAuth Strategy for Express

```
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SEAuth = require('signeasy').OAuthStrategy;
const SEApi = require('signeasy').ApiClient;
const cfg = require('./config');
const server = express();

server.use(session({
  secret: 'secrettoken',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport
server.use(passport.initialize());
server.use(passport.session());

// Add SignEasy OAuthClient as passport-strategy for authentication
passport.use(new SEAuth(
  {
    sandbox: true,
    clientID: cfg.clientID,
    clientSecret: cfg.clientSecret,
    callbackURL: cfg.callbackURL,
    scope: 'user:read'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Got access token', accessToken, refreshToken);

    // Once we have the accessToken & refreshToken, we can initialize the SignEasy API Client for making API requests
    const apiClient = new SEApi({
      sandbox: true,
      clientId: cfg.clientID,
      clientSecret: cfg.clientSecret,
      accessToken: accessToken,
      refreshToken: refreshToken
    });

    apiClient.getProfile((err, user) => {
      if (err) {
        done(err);
        return;
      }

      // Ideally, we would want to store the accessToken & refreshToken in some DB for later use
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      console.log('Got user', user);

      done(undefined, user);
    });
  }
));


server.get('/auth', passport.authenticate('signeasy'));
server.get('/auth/cb', passport.authenticate('signeasy',
  {
    session: true
  }
), (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(false);
  }
});


server.listen(cfg.port, function () {
  console.log(`Visit ${cfg.baseUrl} to view the app`);
});

```


#### Using SignEasy API Client for making API requests
Once we have the `accessToken` & `refreshToken`, we can instantiate our new Signeasy API Client using which we will make all our api calls.

```
const SEApi = require('signeasy').ApiClient;

// Instantiating our new ApiClient
const apiClient = new SEApi({
  clientId: 'CLIENT_ID_HERE',
  clientSecret: 'CLIENT_SECRET_HERE',
  accessToken: 'ACCESS_TOKEN_HERE', // retrieved as part of Authorization
  refreshToken: 'REFRESH_TOKEN_HERE' // retrieved as part of Authorization
});

// Fetching current user profile
apiClient.getProfile((err, profile) => {
  if (err) {
    throw err;
  }

  console.log('Fetched user profile', profile);
})


// Fetching all files of current user
apiClient.getAllFiles((err, files) => {
  if (err) {
    throw err;
  }

  console.log('Fetched all files', files);
})
```

### Docs

[List of all functions & their usage is available here](/docs)


### Tests
Tests can be run either against Dev apis or production apis. To run tests, one needs to pass the following values as environment variables
`CLIENT_ID`
`CLIENT_SECRET`
`ACCESS_TOKEN`
`REFRESH_TOKEN`

To run tests against Dev apis, run the below command
```
ACCESS_TOKEN=YOUR_ACCESS_TOKEN REFRESH_TOKEN=YOUR_REFRESH_TOKEN CLIENT_ID=YOUR_CLIENT_ID CLIENT_SECRET=YOUR_CLIENT_SECRET npm test
```

To run tests against Production apis, run the below command
```
NODE_ENVIRONMENT=PRODUCTION ACCESS_TOKEN=YOUR_ACCESS_TOKEN REFRESH_TOKEN=YOUR_REFRESH_TOKEN CLIENT_ID=YOUR_CLIENT_ID CLIENT_SECRET=YOUR_CLIENT_SECRET npm test
```

### Support

- For getting API Access (client id & secret): http://lp.getsigneasy.com/api-request/
- Technical Assistance: support@getsigneasy.com
- Sales Enquiries: sales@getsigneasy.com


### License
MIT
