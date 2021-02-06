import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator, View, Image, StyleSheet, Text} from 'react-native';
import {Storage} from 'aws-amplify';
import Ionicons from 'react-native-vector-icons/Ionicons';
function ProgressImage({itemDocuments, imgStyle, isEyeBe}) {
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState();

  async function getPicture(picKey) {
    let tempPicUrl;
    tempPicUrl = await Storage.get(picKey);
    if (tempPicUrl !== undefined) {
      setLoading(false);
      setImgUrl(tempPicUrl);
    }
  }

  useEffect(() => {
    getPicture(itemDocuments[0].key);
  }, [itemDocuments]);

  return (
    <View style={imgStyle}>
      <View style={styles.picLengthCont}>
        <Text style={styles.picLengthText}>{itemDocuments.length}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size={'large'} color={'green'} />
      ) : (
        <Image source={{uri: imgUrl}} style={imgStyle} />
      )}
      {isEyeBe ? (
        <Ionicons
          style={styles.eyeIcon}
          name="eye-outline"
          size={22}
          color="#fff"
        />
      ) : null}
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
    justifyContent: 'center',
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
  eyeIcon: {
    position: 'absolute',
    top: '35%',
    left: '35%',
  },
});

export default ProgressImage;
