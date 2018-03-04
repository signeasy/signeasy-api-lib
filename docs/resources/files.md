## Files

- [getAllFiles()](#getallfiles)
- [importFileAsOriginal()](#importfileasoriginal)
- [getAllOriginalFiles()](#getalloriginalfiles)
- [getOriginalFile()](#getoriginalfile)
- [downloadOriginalFile()](#downloadoriginalfile)
- [updateOriginalFileName()](#updateoriginalfilename)
- [deleteOriginalFile()](#deleteoriginalfile)
- [getAllSignedFiles()](#getallsignedfiles)
- [getSignedFile()](#getsignedfile)
- [downloadSignedFile()](#downloadsignedfile)
- [updateSignedFileName()](#updatesignedfilename)
- [deleteSignedFile()](#deletesignedfile)
- [getAllPendingFiles()](#getallpendingfiles)
- [getPendingFile()](#getpendingfile)
- [initiateSignatureRequest()](#initiatesignaturerequest)
- [remindAboutSignatureRequest()](#remindaboutsignaturerequest)
- [declineSignatureRequest()](#declinesignaturerequest)
- [cancelSignatureRequest()](#cancelsignaturerequest)


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


### getOriginalFile

Retrieves the details of the original file given the file id.

**Usage**

```
const fileid = '124';
apiClient.getOriginalFile(fileid, (err, file) => {
  if (err) {
    throw err;
  }

  console.log('Got the original file', file);
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
})
```


### updateOriginalFileName

This function should be used to update the filename of the uploaded original file.
It will throw an error if some file already exists with the new name.

**Usage**

```
const fileId = '124';
const newFileName = 'newfile.pdf';

apiClient.updateOriginalFileName(fileId, newFileName, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got succesful response', response);
});
```


### deleteOriginalFile

This function should be used to delete the original file.

**Usage**

```
const fileId = '124';

apiClient.deleteOriginalFile(fileId, (err) => {
  if (err) {
    throw err;
  }

  console.log('File deleted');
});
```


### getAllSignedFiles

Retrieve information about all the signed files of a user.

**Usage**

```
apiClient.getAllSignedFiles((err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got all signed files', response);
})
```


### getSignedFile

Retrieves the details of the signed file given the file id.

**Usage**

```
const fileid = '124';
apiClient.getSignedFile(fileid, (err, file) => {
  if (err) {
    throw err;
  }

  console.log('Got the signed', file);
})
```


### downloadSignedFile

This function should be used to fetch the content of the file. It will return a string which you can write into a file

**Usage**

```
const fs = require('fs');


const fileId = '124';

apiClient.downloadSignedFile(fileId, (err, response) => {
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
})
```


### updateSignedFileName

This function should be used to update the filename of the uploaded signed file.
It will throw an error if some file already exists with the new name.

**Usage**

```
const fileId = '124';
const newFileName = 'newfile.pdf';

apiClient.updateSignedFileName(fileId, newFileName, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got succesful response', response);
});
```


### deleteSignedFile

This function should be used to delete the signed file.

**Usage**

```
const fileId = '124';

apiClient.deleteSignedFile(fileId, (err) => {
  if (err) {
    throw err;
  }

  console.log('File deleted');
});
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

### getPendingFile
Retrive information of a pending file by the file id.

**Usage**

```
var pendingFileId = 678;

client.getPendingFile(pendingFileId, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got file', file);
});
```


### initiateSignatureRequest
Use this function to initiate a signature request


**Usage**

```
var data = {
  recipients: [
    {
      email: 'test@getsigneasy.com',
      first_name: 'test',
      last_name: 'signeasy'
    }
  ],
  original_file_id: originalFileId,
  is_ordered: 1,
  message: 'Some message to recipients', // Optional
};

client.initiateSignatureRequest(data, (err, response) => {
  if (err) {
    throw err;
  }

  console.log('Got response', response);
});
```

### remindAboutSignatureRequest
Use this function to remind the next recipient to sign the document. If it is not ordered, then all recipients who have not signed will get the reminder.

**Usage**

```
const fileId = 678;
const optionalMsg = 'Please Sign';

client.remindAboutSignatureRequest(fileId, optionalMsg, (err) => {
  if (err) {
    throw(err);
  }

  console.log('Reminder sent');
});
```

### declineSignatureRequest
Use this function to decline the signature request.

**Usage**

```
const fileId = 678;
const optionalMsg = "I can't sign this";

client.declineSignatureRequest(fileId, optionalMsg, (err) => {
  if (err) {
    throw(err);
  }

  console.log('Signature request declined');
});
```


### cancelSignatureRequest
Use this function to cancel an existing pending file. An email will be sent to all recipients stating the same.

**Usage**

```
const fileId = 678;
const optionalMsg = "Cancelling this file due to some errors";

client.cancelSignatureRequest(fileId, optionalMsg, (err) => {
  if (err) {
    throw(err);
  }

  console.log('Signature request cancelled');
});
```
