const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const SEAuth = require('signeasy').OAuthStrategy;
const SEApi = require('signeasy').ApiClient;
const cfg = require('./config');

const userSessionCache = {};

var app = express();

app.use(
  session({
    secret: 'secrettoken',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static('public'));

// view engine setup
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);

app.set('view engine', 'handlebars');

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

function getApiClient(accessToken, refreshToken) {
  return new SEApi({
    sandbox: true,
    clientId: cfg.clientID,
    clientSecret: cfg.clientSecret,
    accessToken: accessToken,
    refreshToken: refreshToken
  });
}

// Add SignEasy OAuthClient as passport-strategy for authentication
passport.use(
  new SEAuth(
    {
      sandbox: true,
      clientID: cfg.clientID,
      clientSecret: cfg.clientSecret,
      callbackURL: cfg.callbackURL,
      scope:
        'user:read rs:read rs:create rs:update original:read original:create original:update signed:create signed:read signed:update files:read'
    },
    function(accessToken, refreshToken, profile, done) {
      // Once we have the accessToken & refreshToken, we can initialize the SignEasy API Client for making API requests
      const apiClient = getApiClient(accessToken, refreshToken);

      apiClient.getProfile((err, user) => {
        if (err) {
          done(err);
          return;
        }

        // Ideally, we would want to store the accessToken & refreshToken in some DB for later use
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        done(undefined, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  userSessionCache[user.id] = user;
  done(undefined, user.id);
});

passport.deserializeUser(function(id, done) {
  done(undefined, userSessionCache[id]);
});

app.use((req, res, next) => {
  if (req.user) {
    res.locals.isLoggedIn = true;
    req.apiClient = getApiClient(req.user.accessToken, req.user.refreshToken);
  }

  res.locals.filePath = '/files/form.pdf';
  res.locals.authUrl = '/auth';
  next();
});

app.get('/auth', passport.authenticate('signeasy'));
app.get(
  '/auth/cb',
  passport.authenticate('signeasy', {
    session: true
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/upload', (req, res) => {
  if (req.user) {
    const filename = 'test123' + Date.now() + '.pdf';
    req.apiClient.importFileAsOriginal(
      filename,
      path.join(__dirname, '/public/files/form.pdf'),
      (error, result) => {
        res.json({
          error,
          result
        });
      }
    );
  } else {
    res.json({
      error: 'User not logged in'
    });
  }
});

app.get('/getSigningUrl', (req, res) => {
  if (req.user && req.query.fileId) {
    req.apiClient.getSigningUrl(req.query.fileId, (error, result) => {
      res.json({
        error,
        result
      });
    });
  } else {
    res.json({
      error: 'User not logged in'
    });
  }
});

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(cfg.port);
