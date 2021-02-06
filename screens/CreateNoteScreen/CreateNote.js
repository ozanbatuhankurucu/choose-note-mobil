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
import CheckBox from '@react-native-community/checkbox';
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
import ProgressCircle from 'react-native-progress-circle';
import ImageView from 'react-native-image-viewing';
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
  const {user, addNoteToUserNotes, setUser} = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [sizeControl, setSizeControl] = useState(false);
  const [saveUserInfo, setSaveUserInfo] = useState(false);
  const [totalFileSizes, setTotalFileSizes] = useState({
    totalPicsFileSize: 0,
    totalFileSize: 0,
  });
  const [accumulatingPicsFileSize, setAccumulatingPicsFileSize] = useState(0);
  const [modalViewVisible, setModalViewVisible] = useState(false);
  const [modalViewIndex, setModalViewIndex] = useState(0);

  const maxKb = 10240000;
  function selectMultipleImagesFromGallery() {
    ImagePicker.openPicker({
      multiple: true,
      cropping: false,
      maxFiles: 20,
      compressImageQuality: 0.4,
      mediaType: 'photo',
    })
      .then((images) => {
        let totalPicsSize = 0;
        for (const pic of images) {
          totalPicsSize += pic.size;
        }
        setTotalFileSizes((prev) => {
          return {
            ...prev,
            totalPicsFileSize: totalPicsSize,
          };
        });
        setPictures(images);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

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
        setTotalFileSizes((prev) => {
          return {
            ...prev,
            totalFileSize: res.size,
          };
        });
      } else {
        setFile(null);
        setSizeControl(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log(err);
      } else {
        throw err;
      }
    }
  }

  async function updateUserUniAndDepartment() {
    const userDetails = {
      id: user.id,
      university: user.university === '' ? university.name : user.university,
      department: user.department === '' ? department.name : user.department,
    };
    try {
      const updatedUser = await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: userDetails,
        },
      });
      let updatedUserTemp = updatedUser.data.updateUser;
      setUser(updatedUserTemp);
    } catch (e) {
      console.log(e);
    }
  }

  async function createNote() {
    setIsUploadPicture(true);
    if (saveUserInfo === true) {
      if (user.university === '' || user.department === '') {
        await updateUserUniAndDepartment();
      }
    }

    const pictureUrls = [];
    const fileDocumentUrls = [];
    if (Pictures !== null) {
      for (const pic of Pictures) {
        const urlResult = await storageService(
          pic,
          'notes',
          setAccumulatingPicsFileSize,
        );

        pictureUrls.push({bucket: bucket, region: region, key: urlResult});
      }
    }
    if (file !== null) {
      const fileUrlResult = await storageServiceFile(
        file,
        'fileDocuments',
        setAccumulatingPicsFileSize,
        Pictures,
      );

      fileDocumentUrls.push({
        bucket: bucket,
        region: region,
        key: fileUrlResult,
      });
    }

    const noteDetails = {
      university: user.university === '' ? university.name : user.university,
      termID: term.id,
      owner: user.owner,
      department: user.department === '' ? department.name : user.department,
      lesson: lesson.toLowerCase(),
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
      setIsUploadPicture(false);
      setModalVisible(true);
      setAccumulatingPicsFileSize(0);
      setTotalFileSizes({
        totalPicsFileSize: 0,
        totalFileSize: 0,
      });
    } catch (e) {
      console.log(e);
    }
  }
  function btnDisableTempControl() {
    let result;
    if (Pictures === null && file === null) {
      result = true;
    } else {
      if (Pictures !== null) {
        if (Pictures.length > 20) {
          result = true;
        } else {
          result = false;
        }
      }
    }

    return result;
  }
  function createBtnDisableControl() {
    if (user.university !== '' && user.department !== '') {
      if (
        term !== null &&
        lesson !== '' &&
        description !== '' &&
        price !== ''
      ) {
        return btnDisableTempControl();
      } else {
        return true;
      }
    } else {
      if (
        university !== null &&
        term !== null &&
        department !== null &&
        lesson !== '' &&
        description !== '' &&
        price !== ''
      ) {
        return btnDisableTempControl();
      } else {
        return true;
      }
    }
  }

  function makeImageView() {
    //path
    let imgArray = [];
    if (Pictures !== null) {
      Pictures.forEach((img) => {
        imgArray.push({
          uri: img.path,
        });
      });
    }

    return imgArray;
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
    },
  ];
  return (
    <>
      {isUploadPicture === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ProgressCircle
            percent={parseInt(
              (accumulatingPicsFileSize * 100) /
                (totalFileSizes.totalPicsFileSize +
                  totalFileSizes.totalFileSize),
            )}
            radius={45}
            borderWidth={8}
            color="green"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>
              {parseInt(
                (accumulatingPicsFileSize * 100) /
                  (totalFileSizes.totalPicsFileSize +
                    totalFileSizes.totalFileSize),
              ) + '%'}
            </Text>
          </ProgressCircle>
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
                maxLength={5}
                style={styles.priceInput}
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

          {user.university === '' || user.department === '' ? (
            <>
              <View>
                <Text style={{marginTop: 5, fontWeight: '700'}}>
                  University<Text style={{color: 'red'}}>*</Text>
                </Text>
                <SearchDropdown
                  items={universitiesData}
                  onItemSelect={setUniversity}
                  placeHolder={
                    university === null ? 'Select university' : university.name
                  }
                />
              </View>
              <View>
                <Text style={{marginTop: 5, fontWeight: '700'}}>
                  Department<Text style={{color: 'red'}}>*</Text>
                </Text>
                <SearchDropdown
                  items={departmentsData}
                  onItemSelect={setDepartment}
                  placeHolder={
                    department === null ? 'Select department' : department.name
                  }
                />
              </View>
            </>
          ) : null}
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Term of lesson<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SearchDropdown
              items={terms}
              onItemSelect={setTerm}
              placeHolder={term === null ? 'Select term' : term.name}
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
                    <TouchableOpacity onPress={selectMultipleImagesFromGallery}>
                      <Text style={{fontWeight: '700'}}>
                        You should pick min 1, max 20 pictures.
                      </Text>
                    </TouchableOpacity>
                    <ScrollView horizontal={true}>
                      {Pictures !== null
                        ? Pictures.map((image, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  setModalViewVisible(true);
                                  setModalViewIndex(index);
                                }}>
                                <Image
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 30,
                                  }}
                                  source={{uri: image.path}}
                                />
                              </TouchableOpacity>
                            );
                          })
                        : null}
                    </ScrollView>
                  </View>
                )
              ) : (
                <View style={{flex: 5}}>
                  <TouchableOpacity onPress={selectMultipleImagesFromGallery}>
                    <Text style={{fontWeight: '700'}}>
                      You should pick min 1, max 20 pictures.
                    </Text>
                  </TouchableOpacity>
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
            onPress={() => pickDocumentFile()}>
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
                <Text style={{fontWeight: '700'}}>
                  Upload Pdf File{' '}
                  <Text style={{color: 'gray', fontWeight: '400'}}>
                    (Max file size should be 10mb.)
                  </Text>
                </Text>
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
          {user.university === '' || user.department === '' ? (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={saveUserInfo}
                onValueChange={setSaveUserInfo}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Save my information</Text>
            </View>
          ) : null}

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
          <ImageView
            images={makeImageView()}
            imageIndex={modalViewIndex}
            visible={modalViewVisible}
            onRequestClose={() => setModalViewVisible(false)}
            FooterComponent={(x) => (
              <View style={{alignItems: 'center', paddingBottom: 20}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {x.imageIndex + 1 + '/' + Pictures.length}
                </Text>
              </View>
            )}
          />
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
  checkboxContainer: {
    flexDirection: 'row',
    width: ScreenWidth * 0.9,
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
