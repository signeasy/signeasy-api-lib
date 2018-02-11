## Signing

- [getSigningUrl()](#getsigningurl)


### getSigningUrl

Retrieves the unique url which can be used to sign an original document.

**Usage**

```
const fileId = '124';

apiClient.getSigningUrl(fileId, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got signing url', response)
})
```
