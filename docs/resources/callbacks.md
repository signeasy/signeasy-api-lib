## Callbacks

- [getCallbackUrls()](#getcallbackurls)
- [createCallbackUrls()](#createcallbackurls)
- [deleteCallbackUrls()](#deletecallbackurls)


### getCallbackUrls

Retrieves all callback urls for the particular user and client

**Usage**

```
apiClient.getCallbackUrls((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got URLS', response)
})
```


### createCallbackUrls

Will add the callback urls for the particular user and client

**Usage**

```
const urls = [
  'https://host.com/dosomething1',
  'https://host.com/dosomething2'
];

apiClient.createCallbackUrls(urls, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got URLS', response)
})
```


### deleteCallbackUrls

Will delete the callback urls for the particular user and client

**Usage**

```
const urls = ['https://host.com/dosomething1'];

apiClient.deleteCallbackUrls(urls, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got URLS', response)
})
```
