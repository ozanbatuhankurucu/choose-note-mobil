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
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {downloadFile} from '../../Services/downloadFileService';
import {Storage, API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {graphqlOperation} from 'aws-amplify';
import {UserContext} from '../../contexts/UserContext/UserContext';
import * as mutations from '../../graphql/mutations';
function UserNotesScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteNoteDetails, setDeleteNoteDetails] = useState();
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);



  console.log(deleteNoteDetails);
  const {
    user,
    setUser,
    getNotesWithNexToken,
    userNotes,
    setUserNotes,
  } = useContext(UserContext);
  async function onEndReached() {
    console.log('sonuna ulastik listenin');
    const nextNotes = await getNotesWithNexToken(user.id);
    console.log('satir 27 usernotesscreen');
    console.log(nextNotes);
    if (nextNotes !== null) {
      setUserNotes((prev) => {
        return [...prev, ...nextNotes];
      });
    }
  }
  console.log(userNotes);
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
      console.log(deletedNote);
      arr = userNotes.filter((item) => item.id !== deleteNoteDetails.id);
      console.log(arr);
      setUserNotes(arr);
      setIsDeleteSpinner(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function getPictureUrls(pictureUrls) {
    setIsDeleteSpinner(true);
    console.log(pictureUrls);
    const tempArray = [];
    let picUrls = pictureUrls;
    for (const key of picUrls) {
      const tempPicUrl = await Storage.get(key.key);
      console.log(tempPicUrl);
      tempArray.push({url: tempPicUrl});
    }
    setIsDeleteSpinner(false);
    return tempArray;
  }
  function _renderItem({item}) {
    return (
      <TouchableOpacity
        key={item.id}
        onLongPress={() => {
          setDeleteNoteDetails({
            owner: item.owner,
            createdAt: item.createdAt,
            id: item.id,
          });
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.boxWithShadow}>
          <View style={{flex: 5}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.lesson}
              </Text>
              <Text style={{fontSize: 14, color: '#464647'}}>
                {item.description}
              </Text>

              <Text style={{fontSize: 11}}>
                {moment(item.createdAt).format('LLLL')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 12,
              }}>
              {item.documents.length === 0 ? null : (
                <TouchableOpacity
                  onPress={async () => {
                    const tempArray = await getPictureUrls(item.documents);
                    navigation.navigate('Image View', tempArray);
                  }}>
                  <EvilIcons name="image" size={32} color="green" />
                </TouchableOpacity>
              )}
              {item.documentFiles.length === 0 ? null : (
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={async () => {
                    const tempArray = await getPictureUrls(item.documentFiles);
                    downloadFile(tempArray[0].url)
                    console.log(tempArray);
                  }}>
                  <Feather name="file" size={20} color="purple" />
                </TouchableOpacity>
              )}
            </View>
            {item.isPrivate ? (
              <Feather name="lock" size={22} color="black" />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
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
      {/* {isDeleteSpinner === true ? (
        <View style={{marginTop:240}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : null} */}
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={isDeleteSpinner}
          />
        }
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={userNotes}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  boxWithShadow: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 6,
  },
  imageCont: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});

export default UserNotesScreen;
