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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ProgressImage from '../../components/ProgressImage/ProgressImage';
import PostIcon from '../../components/PostIcon/PostIcon';
import {termConverter} from '../../HelperFunctions/HelperFunctions';
import {downloadFile} from '../../Services/downloadFileService';
import {Storage, API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {graphqlOperation} from 'aws-amplify';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';
import * as mutations from '../../graphql/mutations';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function SearchNotesScreen({navigation}) {
  const {searchedNotes} = useContext(SearchContext);
  const [loadImage, setLoadImage] = useState(false);
  console.log(loadImage);
  async function getPictureUrls(pictureUrls) {
    setLoadImage(true);
    //console.log(pictureUrls);
    const tempArray = [];
    let picUrls = pictureUrls;
    for (const key of picUrls) {
      const tempPicUrl = await Storage.get(key.key);
      //console.log(tempPicUrl);
      tempArray.push({url: tempPicUrl});
    }
    setLoadImage(false);
    return tempArray;
  }
  function _renderItem({item}) {
    return (
      <View key={item.id}>
        <View style={styles.boxWithShadow}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Image
                source={{uri: item.student.profilePicture}}
                style={styles.pickUpImage}
              />
            </View>
            <View style={{flex: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 5}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {item.student.username}
                  </Text>
                  <Text style={{fontSize: 13}}>{item.description}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <FontAwesome name="bookmark-o" size={24} color="#B76285" />
                </View>
              </View>
              {item.documents.length === 0 ? null : (
                <TouchableOpacity
                  onPress={async () => {
                    const tempArray = await getPictureUrls(item.documents);
                    navigation.navigate('Image View', tempArray);
                  }}>
                  <ProgressImage imageKey={item.documents[0].key} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginTop: 15, paddingHorizontal: 15}}>
            <PostIcon
              iconName="university"
              iconSize={18}
              iconText={item.university}
            />
            <PostIcon
              iconName="graduation-cap"
              iconSize={18}
              iconText={item.department}
            />
            <PostIcon
              iconName="pencil"
              iconSize={18}
              iconText={termConverter(item.termID)}
            />
            <PostIcon iconName="book" iconSize={18} iconText={item.lesson} />
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <View style={{flex: 1, padding: 3}}>
                <FontAwesome name="file" size={16} color="black" />
              </View>
              <View style={{flex: 7}}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 11,
                      textDecorationLine: 'underline',
                      color: 'blue',
                    }}>
                    download
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 15,
              paddingHorizontal: 15,
            }}>
            <Text style={{fontSize: 11}}>
              {moment(item.createdAt).format('LLLL')}
            </Text>
          </View>
          {/* <View>
              <Text>Username: {item.student.username}</Text>
              <Image
                source={{uri: item.student.profilePicture}}
                style={styles.pickUpImage}
              />

              <Text>University:{item.university}</Text>
              <Text>Department: {item.department}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Lesson: {item.lesson}
              </Text>
              <Text style={{fontSize: 14, color: '#464647'}}>
                {item.description}
              </Text>

              <Text style={{fontSize: 11}}>
                {moment(item.createdAt).format('LLLL')}
              </Text>
            </View> */}

          <View
            style={{
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
              {/* {item.documents.length === 0 ? null : (
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
                    downloadFile(tempArray[0].url);
                    console.log(tempArray);
                  }}>
                  <Feather name="file" size={20} color="purple" />
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.mainCont}>
      {loadImage === true ? (
        <View style={styles.loadImage}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View>
      ) : null}
      <FlatList
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={searchedNotes}
        //onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    paddingHorizontal: 10,
  },
  boxWithShadow: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginVertical: 6,
  },
  pickUpImage: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  loadImage: {
    position: 'absolute',
    top: windowHeight * 0.4,
    zIndex: 1,
    left: windowWidth * 0.5,
  },
});

export default SearchNotesScreen;
