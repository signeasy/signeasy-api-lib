## Files

- [getAllFiles()](#getallfiles)
- [getAllPendingFiles()](#getallpendingfiles)
- [getAllOriginalFiles()](#getalloriginalfiles)
- [importFileAsOriginal()](#importfileasoriginal)
- [downloadOriginalFile()](#downloadoriginalfile)


### getAllFiles

Retrieves all the files of a user. Requires the authentication scope `files:read`

**Usage**

```
apiClient.getAllFiles((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got files', response);
})
```


### getAllPendingFiles

Retrieve information about all the pending files of a user, including all the pending files where s/he is the owner and recipient. This API returns a response irrespective of whether the pending file is `complete`, `incomplete`, `canceled` or `recipient_declined`.

**Usage**

```
apiClient.getAllPendingFiles((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got all pending files', response);
})
```


### getAllOriginalFiles

Retrieve information about all the original file of a user.

**Usage**

```
apiClient.getAllOriginalFiles((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got all original files', response);
})
```

### importFileAsOriginal
This function should be used to create a new original file. It takes 2 params
- File name - The name by which you would like to upload the file (should include file extension)
- File path - Full path of the file which is currently stored.

Note: If file with given filename already exists on server, then it will throw a `filename_exists` error.
In such case, you should retry uploading with different name.

**Usage**

```
const path = require('path');


const filename = 'test123.pdf';
const filepath = path.join(__dirname, '/../files/contract.pdf');

apiClient.importFileAsOriginal(filename, filepath, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('File uploaded', response);
})
```


### downloadOriginalFile
This function should be used to fetch the content of the file. It will return a string which you can write into a file

**Usage**

```
const fs = require('fs');


const fileId = '124';

apiClient.downloadOriginalFile(fileId, (err, response) => {
  if (err) {
    throw err;
  }

  // Write response to a file or send it to client
  fs.writeFile('test124.pdf', response, (err) => {
    if (err) {
      throw err
    };
    console.log('The file has been saved!');
  });

  console.log('File uploaded', response);
})
```
