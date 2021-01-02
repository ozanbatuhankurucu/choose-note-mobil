import RNFetchBlob from 'rn-fetch-blob';
 export function downloadFile(url) {
    let dirs = RNFetchBlob.fs.dirs;
    let date = new Date();
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.

      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        path:
          dirs.DownloadDir +
          '/NoteUp-' +
          Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
        description: 'Downloading file.',
      },
    })
      .fetch('GET', url, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log(res);
        console.log('The file saved to ', res.path());
      });
  }