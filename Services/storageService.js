import config from '../aws-exports';
import uuid from 'react-native-uuid';
import {Storage} from 'aws-amplify';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
 export async function storageService(pic,folderName) {
    let picUrl;

    var testUUID = uuid.v1();
    let response = await fetch(pic.path);
    let blob = await response.blob();
    let key = `${folderName}/${testUUID}`;
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    await Storage.put(key, blob, {
      contentType: pic.mime,
    })
      .then((data) => {
        console.log(data + '21. satir');
        picUrl = key;
      })
      .catch((err) => console.log(err));
    console.log(picUrl);
    return picUrl;
  }

  export async function storageServiceFile(file,folderName) {
    let fileUrl;

    var testUUID = uuid.v1();
    let response = await fetch(file.uri);
    let blob = await response.blob();
    let key = `${folderName}/${testUUID+file.name}`;
    let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    await Storage.put(key, blob, {
      contentType: file.type,
    })
      .then((data) => {
        console.log(data + '40. satir');
        fileUrl = key;
      })
      .catch((err) => console.log(err));
    console.log(fileUrl);
    return fileUrl;
  }