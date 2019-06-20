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


// Ideally, one would use something like Redis in production for storing our
// sessions
const userSessionCache = {};

server.use(
  session({
    secret: 'secret token',
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport
server.use(passport.initialize());
server.use(passport.session());

// Add Signeasy OAuthClient as passport-strategy for authentication
passport.use(
  new SEAuth(
    {
      sandbox: true,
      clientID: cfg.clientID,
      clientSecret: cfg.clientSecret,
      callbackURL: cfg.callbackURL,
      scope: 'user:read rs:read rs:create rs:update original:read original:create original:update signed:create signed:read signed:update files:read template:manage webhooks:manage'
    },
    function(accessToken, refreshToken, profile, done) {

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

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        done(null, user);
      });
    }
  )
);

// More about serializeUser & deserializeUser functions here -
// http://www.passportjs.org/docs/configure/
passport.serializeUser(function(user, done) {
  userSessionCache[user.id] = user;
  done(undefined, user.id);
});

passport.deserializeUser(function(id, done) {
  done(undefined, userSessionCache[id]);
});

server.get('/auth/provider', passport.authenticate('signeasy'));
server.get(
  '/auth/provider/callback',
  passport.authenticate('signeasy'),
  (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.redirect('/auth/provider');
    }
  }
);

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.use((err, req, res, next) => {
  console.error('Server error', err);

  // Do not expose system error(`err`) to outside world
  res.status(500).json({
    errors: ['Something went wrong. Please try again later']
  });
});

server.listen(cfg.port, function() {
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

- For getting API Access (client id & secret): http://lp.signeasy.com/api-request/
- Technical Assistance: support@signeasy.com
- Sales Enquiries: sales@signeasy.com


### License
MIT
