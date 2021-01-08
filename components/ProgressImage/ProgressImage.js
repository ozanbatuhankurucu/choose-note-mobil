import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator, View, Image, StyleSheet, Text} from 'react-native';
import {Storage} from 'aws-amplify';

function ProgressImage({itemDocuments, imgStyle}) {
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
    getPicture(itemDocuments[0].key);
  }, []);
  return (
    <View style={imgStyle}>
      <View style={styles.picLengthCont}>
        <Text style={styles.picLengthText}>{itemDocuments.length}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size={'large'} color={'green'} />
      ) : (
        <Image source={{uri: imgUrl}} style={imgStyle}  />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  picLengthCont: {
    backgroundColor: '#00509d',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    position: 'absolute',
    right: -5,
    top: -5,
    alignItems: 'center',
    zIndex: 1,
  },
  picLengthText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default ProgressImage;
