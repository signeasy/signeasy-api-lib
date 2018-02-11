## Users

- [getProfile()](#getprofile)


### getProfile

Retrieves the profile details of the user whose access_token was used to instantiate API Client.

**Usage**

```
apiClient.getProfile((err, profile) => {
  if (err) {
    throw err;
  }

  console.log('Got user profile', profile)
})
```
