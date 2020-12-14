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
import {SearchContext} from '../../contexts/SearchContext/SearchContext';
import * as mutations from '../../graphql/mutations';

function SearchNotesScreen({navigation}) {
  const {searchedNotes} = useContext(SearchContext);
  function _renderItem({item}) {
    return (
      <View key={item.id}>
        <View style={styles.boxWithShadow}>
          <View style={{flex: 5}}>
            <View>
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
            {item.isPrivate ? (
              <Feather name="lock" size={22} color="black" />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
  return (
    <FlatList
      keyExtractor={(item, index) => {
        return item.id;
      }}
      data={searchedNotes}
      //onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      renderItem={_renderItem}
    />
  );
}

const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 6,
  },
  pickUpImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});

export default SearchNotesScreen;
