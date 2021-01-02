import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  LogBox,
  Alert,
  TextInput,
} from 'react-native';
import universitiesData from '../../Datas/universities.json';
import departmentsData from '../../Datas/departments.json';
import {terms} from '../../Datas/dropdownDatas';
import SearchDropdown from '../../components/SearchDropdown/searchDropdown';
import StandardTextInput from '../../components/StandardTextInput/standardTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  storageService,
  storageServiceFile,
} from '../../Services/storageService';
import {UserContext} from '../../contexts/UserContext/UserContext';
import Auth from '@aws-amplify/auth';
import {API} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import config from '../../aws-exports';
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default function CreateNoteScreen({navigation}) {
  const [university, setUniversity] = useState(null);
  const [term, setTerm] = useState(null);
  const [department, setDepartment] = useState(null);
  const [lesson, setLesson] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Pictures, setPictures] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploadPicture, setIsUploadPicture] = useState(false);
  const {user, addNoteToUserNotes} = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [sizeControl, setSizeControl] = useState(false);
  const maxKb = 10240000;
  console.log(typeof price);
  console.log(price);
  selectMultipleImagesFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 20,
      compressImageQuality: 0.4,
      mediaType: 'photo',
    })
      .then((images) => {
        console.log(images);
        setPictures(images);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  async function pickDocumentFile() {
    setSizeControl(false);
    setFile(null);
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      if (res.size < maxKb) {
        setFile(res);
        setSizeControl(false);
      } else {
        setFile(null);
        setSizeControl(true);
      }
      console.log('------');
      console.log(res);
      console.log(res.size);
      console.log(typeof res.size);
      console.log('------');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log(err);
      } else {
        throw err;
      }
    }
  }

  console.log(university);
  console.log(term);
  console.log(department);
  console.log(lesson);
  console.log(description);

  async function createNote() {
    setIsUploadPicture(true);
    const pictureUrls = [];
    const fileDocumentUrls = [];

    if (file !== null) {
      const fileUrlResult = await storageServiceFile(file, 'fileDocuments');
      console.log(fileUrlResult);
      console.log(file);
      fileDocumentUrls.push({
        bucket: bucket,
        region: region,
        key: fileUrlResult,
      });
    }
    if (Pictures !== null) {
      for (const pic of Pictures) {
        const urlResult = await storageService(pic, 'notes');
        console.log(urlResult);
        pictureUrls.push({bucket: bucket, region: region, key: urlResult});
      }
    }

    const noteDetails = {
      university: university.name,
      termID: term.id,
      owner: user.owner,
      department: department.name,
      lesson: lesson,
      description: description,
      documents: pictureUrls,
      noteStudentId: user.id,
      documentFiles: fileDocumentUrls,
      price: price,
    };

    try {
      const newNote = await API.graphql({
        query: mutations.createNote,
        variables: {input: noteDetails},
      });
      addNoteToUserNotes(newNote.data.createNote);

      console.log('302.satir' + newNote);
      console.log(newNote.data.createNote);
      setIsUploadPicture(false);
      setModalVisible(true);
    } catch (e) {
      console.log(e);
    }
  }
  function createBtnDisableControl() {
    if (
      university !== null &&
      term !== null &&
      department !== null &&
      lesson !== '' &&
      description !== '' &&
      price !== ''
    ) {
      if (Pictures === null && file === null) {
        return true;
      } else {
        if (Pictures !== null) {
          if (Pictures.length > 20) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return true;
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <>
      {isUploadPicture === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}
          keyboardShouldPersistTaps="always">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Entypo
                  style={{position: 'absolute', top: 5, right: 5}}
                  name="cross"
                  size={24}
                  color="black"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.goBack();
                  }}></Entypo>
                <View>
                  <Text style={styles.successMessage}>
                    Note has been created successfully.
                  </Text>
                </View>
                <AntDesign
                  name="checkcircle"
                  size={34}
                  color="#4BB543"></AntDesign>
              </View>
            </View>
          </Modal>

          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Price<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.TLSection}>
              <TextInput
                maxLength={10}
                style={styles.priceInput}
                underlineColorAndroid="transparent"
                placeholder="Enter price"
                keyboardType="numeric"
                onChangeText={(val) => {
                  setPrice(parseFloat(val.replace(',', '.')).toFixed(2));
                }}
              />
              <FontAwesome
                style={styles.TLicon}
                name="turkish-lira"
                size={20}
                color="#000"
              />
            </View>
          </View>

          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              University<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={universitiesData}
              onItemSelect={setUniversity}
              placeHolder="Select university"
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Department<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={departmentsData}
              onItemSelect={setDepartment}
              placeHolder="Enter Department"
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Term of lesson<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={terms}
              onItemSelect={setTerm}
              placeHolder="Select term"
            />
          </View>

          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Lesson Name<Text style={{color: 'red'}}>*</Text>
            </Text>
            <StandardTextInput
              onChangeFunction={setLesson}
              plcHolder="Lesson name"
              value={lesson}
              maxVal={60}
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Description about lesson<Text style={{color: 'red'}}>*</Text>
            </Text>
            <StandardTextInput
              onChangeFunction={setDescription}
              plcHolder="Description"
              value={description}
              maxVal={200}
            />
          </View>
          <View style={{width: ScreenWidth * 0.9}}>
            <View
              style={{
                flexDirection: 'row',
                minHeight: 70,
                padding: 12,
                width: '100%',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
              }}>
              {Pictures !== null ? (
                Pictures.length > 20 ? (
                  <View style={{flex: 5}}>
                    <Text style={{color: 'red'}}>
                      You cannot pick more than 20 pictures.
                    </Text>
                  </View>
                ) : (
                  <View style={{flex: 5, paddingHorizontal: 10}}>
                    <Text style={{fontWeight: '700'}}>
                      You should pick min 1, max 20 pictures.
                    </Text>
                    <ScrollView horizontal={true}>
                      {Pictures !== null
                        ? Pictures.map((image, index) => {
                            return (
                              <Image
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 30,
                                }}
                                key={index}
                                source={{uri: image.path}}
                              />
                            );
                          })
                        : null}
                    </ScrollView>
                  </View>
                )
              ) : (
                <View style={{flex: 5}}>
                  <Text style={{fontWeight: '700'}}>
                    You should pick min 1, max 20 pictures.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={selectMultipleImagesFromGallery}>
                <Entypo name="images" size={28} color="#A5A5A6"></Entypo>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{width: ScreenWidth * 0.9}}
            onPress={() => {
              console.log('tikladim kanks');
              pickDocumentFile();
            }}>
            <View
              style={{
                borderWidth: 1,
                padding: 12,
                marginTop: 10,
                borderColor: 'gray',
                flexDirection: 'row',
                borderRadius: 5,
              }}>
              <View style={{flex: 5}}>
                <Text style={{fontWeight: '700'}}>Upload Pdf File</Text>
                {sizeControl === true ? (
                  <Text style={{color: 'red'}}>
                    Please select a maximum file size of 10mb.
                  </Text>
                ) : file !== null ? (
                  <Text>{file.name}</Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name="file-plus" size={28} color="#A5A5A6"></Feather>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={createBtnDisableControl()}
            style={{
              width: ScreenWidth * 0.9,
              marginTop: 40,
              marginBottom: 20,
              justifyContent: 'center',
              height: 50,
              borderRadius: 5,
              backgroundColor:
                createBtnDisableControl() === true ? '#CCC' : 'green',
            }}
            onPress={() => createNote()}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              CREATE NOTE
            </Text>
          </TouchableOpacity>
          <View style={{height: 300}}></View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successMessage: {
    marginTop: 30,
    marginBottom: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  TLSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    width: ScreenWidth * 0.9,
  },
  TLicon: {
    padding: 10,
  },
  priceInput: {
    flex: 1,
    padding: 10,
    color: 'black',
  },
});
