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
  Platform,
  FlatList,
  Linking,
  Modal,
  RefreshControl,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {downloadFile} from '../../Services/downloadFileService';
import ProgressImage from '../../components/ProgressImage/ProgressImage';
import UserOwnNote from '../../components/UserOwnNote/UserOwnNote';
import {Storage, API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {graphqlOperation} from 'aws-amplify';
import {UserContext} from '../../contexts/UserContext/UserContext';
import * as mutations from '../../graphql/mutations';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function UserNotesScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteNoteDetails, setDeleteNoteDetails] = useState();
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);

  const {
    user,
    setUser,
    getNotesWithNexToken,
    userNotes,
    setUserNotes,
  } = useContext(UserContext);
  async function onEndReached() {
    const nextNotes = await getNotesWithNexToken(user.owner);
    if (nextNotes !== null) {
      setUserNotes((prev) => {
        return [...prev, ...nextNotes];
      });
    }
  }
  async function deleteNote() {
    setModalVisible(!modalVisible);
    let arr;
    const noteDetails = {
      owner: deleteNoteDetails.owner,
      createdAt: deleteNoteDetails.createdAt,
    };

    try {
      setIsDeleteSpinner(true);
      const deletedNote = await API.graphql({
        query: mutations.deleteNote,
        variables: {input: noteDetails},
      });

      arr = userNotes.filter((item) => item.id !== deleteNoteDetails.id);

      setUserNotes(arr);
      setIsDeleteSpinner(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function getPictureUrls(pictureUrls) {
    setIsDeleteSpinner(true);
    const tempArray = [];
    let picUrls = pictureUrls;
    for (const key of picUrls) {
      const tempPicUrl = await Storage.get(key.key);
      tempArray.push({url: tempPicUrl});
    }
    setIsDeleteSpinner(false);
    return tempArray;
  }
  async function getFirstPicture(picKey) {
    const tempPicUrl = await Storage.get(picKey);
    return tempPicUrl;
  }

  return (
    <View style={{position: 'relative'}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Entypo
              style={{position: 'absolute', top: 5, right: 5}}
              name="cross"
              size={24}
              color="black"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}></Entypo>
            <View>
              <Text style={styles.successMessage}>
                Are you sure you want to delete the note?
              </Text>
            </View>

            <TouchableOpacity
              style={{position: 'absolute', bottom: 10, right: 20}}
              onPress={() => deleteNote()}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                  fontSize: 16,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isDeleteSpinner === true ? (
        <View style={styles.deleteSpinner}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View>
      ) : null}
      <FlatList
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={userNotes}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => <UserOwnNote note={item} />}
      />
    </View>
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
  deleteSpinner: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    left: windowWidth * 0.5,
  },
});

export default UserNotesScreen;

// onLongPress={() => {
//   if (item.isPrivate) {
//     setDeleteNoteDetails({
//       owner: item.owner,
//       createdAt: item.createdAt,
//       id: item.id,
//     });
//     setModalVisible(!modalVisible);
//   }
// }}
