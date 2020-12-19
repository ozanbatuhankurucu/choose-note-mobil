import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator, View, Image} from 'react-native';
import {Storage} from 'aws-amplify';

function ProgressImage({imageKey}) {
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState();
  async function getPicture(picKey) {
    console.log(picKey);
    let tempPicUrl;
    tempPicUrl = await Storage.get(picKey);
    console.log(tempPicUrl);
    if (tempPicUrl !== undefined) {
      setLoading(false);
      setImgUrl(tempPicUrl);
    }
  }

  useEffect(() => {
    getPicture(imageKey);
  }, []);
  return (
    <View style={{paddingTop: 10}}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'green'} />
      ) : (
        <Image
          source={{uri: imgUrl}}
          style={{width: '100%', height: 200, borderRadius: 20}}
        />
      )}
    </View>
  );
}

export default ProgressImage;
