import config from '../aws-exports';
import uuid from 'react-native-uuid';
import {Storage} from 'aws-amplify';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
export async function storageService(
  pic,
  folderName,
  setAccumulatingPicsFileSize,
) {
  let picUrl;

  var testUUID = uuid.v1();
  let response = await fetch(pic.path);
  let blob = await response.blob();
  let key = `${folderName}/${testUUID}`;
  let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
  await Storage.put(key, blob, {
    contentType: pic.mime,
    progressCallback(progress) {
      if (progress.loaded / progress.total === 1) {
        setAccumulatingPicsFileSize((prev) => prev + progress.total);
      }

      //console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  })
    .then((data) => {
      if (folderName === 'profilePictures') {
        picUrl = url;
      } else {
        picUrl = key;
      }
    })
    .catch((err) => console.log(err));

  return picUrl;
}

export async function storageServiceFile(
  file,
  folderName,
  setAccumulatingPicsFileSize,
  Pictures,
) {
  let fileUrl;

  var testUUID = uuid.v1();
  let response = await fetch(file.uri);
  let blob = await response.blob();
  let key = `${folderName}/${testUUID + file.name}`;
  let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
  await Storage.put(key, blob, {
    contentType: file.type,
    progressCallback(progress) {
      if (Pictures === null) {
        setAccumulatingPicsFileSize(progress.loaded);
      } else {
        if (progress.loaded / progress.total === 1) {
          setAccumulatingPicsFileSize((prev) => prev + progress.total);
        }
      }
      //console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    },
  })
    .then((data) => {
      fileUrl = key;
    })
    .catch((err) => console.log(err));

  return fileUrl;
}
