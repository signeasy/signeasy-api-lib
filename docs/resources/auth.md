## Auth

- [refreshToken()](#refreshtoken)


### refreshToken

Refreshes the current tokens by returning new set of `access_token` & `refresh_token`.
Once a new tokens are issued, the old tokens will be invalid for use.

**Usage**

```
apiClient.refreshToken((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got new tokens', response.access_token, response.refresh_token);
})
```
