import config from '../aws-exports';
import uuid from 'react-native-uuid';
import {Storage} from 'aws-amplify';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
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
  //Resiml yüklediğimizde Android tarafında size aynı yüklenirken
  //Ios tarafındaki size yüklendikten sonra farklı bir değer oluyordu.
  //Bu yüzden bunun kontrolünü sağlayıp Ios için sourceUrl kısmını S3 ye gönderiyoruz.
  let result;
  if (Platform.OS === 'ios') {
    const {sourceURL} = pic;
    const filePath = sourceURL.replace('file://', '');
    pic = await RNFetchBlob.fs.stat(filePath);
  }
  let response = await fetch(pic.path);
  result = await response.blob();

  let key = `${folderName}/${testUUID}`;
  let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
  await Storage.put(key, result, {
    contentType: pic.mime,
    progressCallback(progress) {
      console.log('----');
      console.log(pic);
      console.log(progress);
      console.log('----');

      if (
        setAccumulatingPicsFileSize !== undefined &&
        progress.loaded / progress.total === 1
      ) {
        console.log('progress total:' + progress.total);
        setAccumulatingPicsFileSize((prev) => prev + progress.total);
      }
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
