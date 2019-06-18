const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const SEAuth = require('signeasy').OAuthStrategy;
const SEApi = require('signeasy').ApiClient;
const cfg = require('./config');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '/public/files/'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Math.floor(Math.random() * 1000 + 1)}__${file.originalname}`);
  }
});

var upload = multer({ storage: storage });

const userSessionCache = {};

const app = express();

app.use(
  session({
    secret: 'secrettoken',
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(express.static('public'));

// view engine setup
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      inc: function(value) {
        return parseInt(value, 10) + 1;
      }
    }
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

// creating SignEasy OAuthClient as passport-strategy for authentication.
var SEStrategy = new SEAuth(
  {
    sandbox: true,
    clientID: cfg.clientID,
    clientSecret: cfg.clientSecret,
    callbackURL: cfg.callbackURL,
    scope:
      'user:read rs:read rs:create rs:update original:read original:create original:update signed:create signed:read signed:update files:read template:manage webhooks:manage rs:signingurl user:create'
  },
  function(accessToken, refreshToken, profile, done) {
    // Once we have the accessToken & refreshToken, we can initialize the SignEasy API Client for making API requests
    const apiClient = getApiClient(accessToken, refreshToken);

    apiClient.getProfile((err, user) => {
      if (err) {
        done(err);
        return;
      }

      console.log(accessToken, refreshToken);

      // Ideally, we would want to store the accessToken & refreshToken in some DB for later use
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      done(undefined, user);
    });
  }
);

// Adding a custom parameter to set access token expiry.
SEStrategy.tokenParams = function(options) {
  return {
    accesstokenttl: cfg.accessTokenTTL
  };
};

// Adding SignEasy OAuthClient as passport-strategy for authentication.
passport.use(SEStrategy);

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
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req, res, next) => {
  if (req.user) {
    req.apiClient.getAllPendingFiles((err, { files }) => {
      if (err) {
        next(err);
        return;
      }

      console.log('access' + req.user.accessToken);
      const data = {
        clientId: cfg.clientID,
        accessToken: req.user.accessToken,
        pendingFiles: files.map(f => {
          return Object.assign({}, f, {
            canCancel: parseInt(f.owner_user_id, 10) === req.user.id,
            canRemind: parseInt(f.owner_user_id, 10) === req.user.id,
            canDecline: parseInt(f.owner_user_id, 10) !== req.user.id
          });
        })
      };

      res.render('dashboard', {
        data
      });
    });
  } else {
    res.redirect('/');
  }
});

app.post('/api/upload', upload.single('document'), (req, res) => {
  if (req.user) {
    req.apiClient.importFileAsOriginal(
      req.file.filename,
      path.join(__dirname, `/public/files/${req.file.filename}`),
      (err1, res1) => {
        if (err1) {
          res.json({
            error: err1
          });
        } else {
          req.apiClient.getSigningUrl(res1.id, (err2, res2) => {
            res.json({
              error: err2,
              result: Object.assign(res1, res2)
            });
          });
        }
      }
    );
  } else {
    res.json({
      error: 'User not logged in'
    });
  }
});

app.post('/api/create-rs', (req, res) => {
  if (req.user) {
    req.apiClient.initiateSignatureRequest(req.body, (error, result) => {
      res.json({
        error,
        result
      });
    });
  } else {
    res.json({
      error: 'Something went wrong'
    });
  }
});

app.get('/api/remind-rs', (req, res) => {
  if (req.user && req.query.fileId) {
    req.apiClient.remindAboutSignatureRequest(
      req.query.fileId,
      (error, result) => {
        res.json({
          error,
          result
        });
      }
    );
  } else {
    res.json({
      error: 'Something went wrong'
    });
  }
});

app.get('/api/cancel-rs', (req, res) => {
  if (req.user && req.query.fileId) {
    req.apiClient.cancelSignatureRequest(req.query.fileId, (error, result) => {
      res.json({
        error,
        result
      });
    });
  } else {
    res.json({
      error: 'Something went wrong'
    });
  }
});

app.get('/api/decline-rs', (req, res) => {
  if (req.user && req.query.fileId) {
    req.apiClient.declineSignatureRequest(req.query.fileId, (error, result) => {
      res.json({
        error,
        result
      });
    });
  } else {
    res.json({
      error: 'Something went wrong'
    });
  }
});

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(cfg.port);
