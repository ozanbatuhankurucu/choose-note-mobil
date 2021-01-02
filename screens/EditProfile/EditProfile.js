import React, {useState, useContext, useEffect} from 'react';
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
  LogBox,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import StandardTextInput from '../../components/StandardTextInput/standardTextInput';
import InputWithTitle from '../../components/InputWithTitle/InputWithTitle';
import SearchDropdown from '../../components/SearchDropdown/searchDropdown';
import universitiesData from '../../Datas/universities.json';
import departmentsData from '../../Datas/departments.json';
import {UserContext} from '../../contexts/UserContext/UserContext';

function EditProfile({navigation}) {
  const {
    user,
    setImage,
    image,
    setName,
    setUniversity,
    setDepartment,
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
  console.log(user);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <>
      {updateProfileIsLoading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
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
          <View style={{paddingHorizontal: 15,marginTop:10}}>
            <Text style={{marginTop: 5}}>Name</Text>
            <StandardTextInput
              onChangeFunction={setName}
              plcHolder=""
              maxVal={80}
              defVal={user.name}
            />
          </View>

          <View style={{paddingHorizontal: 15}}>
            <Text style={{marginTop: 5}}>
              University<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={universitiesData}
              onItemSelect={setUniversity}
              placeHolder={user.university}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={{marginTop: 5}}>
              Department<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={departmentsData}
              onItemSelect={setDepartment}
              placeHolder={user.department}
            />
          </View>
          <View style={{height: 400}}></View>
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
