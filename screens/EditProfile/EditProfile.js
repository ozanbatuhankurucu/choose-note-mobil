import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import InputWithTitle from '../../components/InputWithTitle/InputWithTitle';
import {UserContext} from '../../contexts/UserContext/UserContext';

function EditProfile({navigation}) {
  const {
    user,
    setImage,
    image,
    setName,
    setUniversity,
    updateProfileIsLoading,
    isConnectedForUpdate,
  } = useContext(UserContext);

  function selectPPicture() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.3,
    })
      .then((image) => {
        console.log(image);
        setImage(image);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }

  return (
    <>
      {updateProfileIsLoading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.imageCont}>
            <View style={{flex: 2, alignItems: 'center'}}>
              <Image
                source={{
                  uri: image === null ? user.profilePicture : image.path,
                }}
                style={styles.pickUpImage}
              />
            </View>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 4}}>
              <Text
                style={{fontSize: 19, color: '#2d6187', fontWeight: 'bold'}}
                onPress={selectPPicture}>
                Change Profile Picture
              </Text>
            </View>
          </View>
          <InputWithTitle
            onChngText={setName}
            defVal={user.name}
            maxLen={80}
            title="Name"
          />
          <InputWithTitle
            onChngText={setUniversity}
            defVal={user.university}
            maxLen={60}
            title="University"
          />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickUpImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageCont: {
    padding: 15,
    flexDirection: 'row',
  },
});

export default EditProfile;
