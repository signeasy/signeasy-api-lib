# Node SDK for SignEasy

A SDK client for Signeasy which will ease the integration of Signeasy Authentication & APIs in your Node based Express apps.

# Usage
For Authentication, we use passport-js which will help with easy integration of Signeasy service for authenticating a user

### Authorizing user & fetching accessToken & refreshToken
### Use it as authentication stratety for passport
```
const express = require('express');
const passport = require('passport');
const SEAuth = require('signeasy').OAuthClient;
const server = express();

server.use(passport.initialize());
server.use(passport.session());

passport.use(new SEAuth(
  {
    sandbox: true, // omit or mark it as false for production use
    clientID: '<CLIENT_ID>',
    clientSecret: '<CLIENT_SECRET>',
    callbackURL: '<REDIRECT_URL>', // User will be redirected here after successful authorization
    scope: 'user:read' // comma separated list of scopes
  },
  function(accessToken, refreshToken, profile, done) {
    // Based on accessToken & refreshToken, you can retrieve the profile
    // of the user
  }
));
```


## Initializing ApiClient & making requests
```
const express = require('express');
const SEApi = require('signeasy').ApiClient;
const server = express();

// Example Route which is already authenticated
server.get('/me', (req, res) => {
  if (req.user) {
    const apiClient = new SEApi({
      sandbox: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      onTokenExpiry: (newAccessToken, done) => {
        // This function will be called when the accessToken is expired
        // & a new accessToken will be issued by using the refreshToken passed
        // Do something with this newAccessToken
        // call done(null, true) once you have finished
      }
    });

    apiClient.users.getUser((err, user) => {
      if (err) {
        done(err);
        return;
      }

      console.log('Got User Profile', user);
    });
  } else {
    res.redirect('/');
  }
});
````


## API Client Signatures


### Create Instance
```
const SEApi = require('signeasy').ApiClient;

const apiClient = new SEApi({
  sandbox: true, // Optional - false or omit it in production mode. Defaults to false
  accessToken: accessToken, // Required
  refreshToken: refreshToken, // Required
  onTokenExpiry: (newAccessToken, done) => { // Required
    // Do something with newAccessToken
    // Call done with the new Access Token
    // done(newAccessToken)
  }
});
```

### Calling methods on resources

```
// Retreiving files
apiClient.files.getFile(fileId, (err, file) => {
    if (err) {
        // handle error;
        return;
    }

    console.log('Got File', file);
});


// Retrieving user
apiClient.users.getProfile((err, user) => {
    if (err) {
        // handle error;
        return;
    }

    console.log('Got User', user);
})
```

