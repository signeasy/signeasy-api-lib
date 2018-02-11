## Initializing API Client

To initialize an API client, one must have already acquired `accessToken` & `refreshToken`.

```
// Importing the ApiClient class from the package
const SEApi = require('signeasy').ApiClient;

// Instantiating a class object
const apiClient = new SEApi({
  clientId: 'YOUR CLIENT ID HERE',
  clientSecret: 'YOUR CLIENT SECRET HERE',
  accessToken: 'ACCESS TOKEN HERE',
  refreshToken: 'REFRESH TOKEN HERE',
})


// Now you can use `apiClient` to call all available functions for executing api requests
// Fetching current user profile
apiClient.getProfile((err, profile) => {
  if (err) {
    throw err;
  }

  console.log('Fetched user profile', profile);
})
```


