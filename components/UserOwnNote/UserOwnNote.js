import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import ProgressImage from '../../components/ProgressImage/ProgressImage';
import {downloadFile} from '../../Services/downloadFileService';
import {useNavigation} from '@react-navigation/native';
import {Storage, API} from 'aws-amplify';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const UserOwnNote = React.memo(({note,setIsDeleteSpinner}) => {
  const navigation = useNavigation();
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
//console.log(note)
  return (
    <View>
      <View style={styles.boxWithShadow}>
        <View style={styles.firstRow}>
          <Text style={styles.itemLesson}>{note.lesson}</Text>
          <Text style={{fontWeight: 'bold'}}>{note.price} TL</Text>
        </View>
        <Text style={styles.itemDescription}>{note.description}</Text>
        <View style={styles.files}>
          {note.documentFiles.length === 0 ? null : (
            <TouchableOpacity
              onPress={async () => {
                const tempArray = await getPictureUrls(note.documentFiles);
                downloadFile(tempArray[0].url);
              }}>
              <View style={styles.pdfFrame}>
                <Text style={styles.pdfText}>PDF</Text>
                <Feather name="download" size={20} color="#00509d" />
              </View>
            </TouchableOpacity>
          )}

          {note.documents.length === 0 ? null : (
            <TouchableOpacity
              style={{marginLeft: note.documentFiles.length === 0 ? 0 : 10}}
              onPress={async () => {
                const tempArray = await getPictureUrls(note.documents);
                navigation.navigate('Image View', tempArray);
              }}>
              <ProgressImage
                itemDocuments={note.documents}
                imgStyle={{borderRadius: 10, width: 60, height: 65}}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.createdCont}>
          <Text style={styles.createdAtText}>
            {moment(note.createdAt).format('LLLL')}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'column',
    marginVertical: 6,
  },
  pdfFrame: {
    width: 60,
    height: 65,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#A2CDFF',
    alignItems: 'center',
    paddingTop: 8,
  },
  pdfText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#464647',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDescription: {fontSize: 14, color: '#464647', marginVertical: 8},
  itemLesson: {fontSize: 16, fontWeight: 'bold'},
  createdCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  createdAtText: {fontSize: 11},

  files: {
    flexDirection: 'row',
  },
});

export default UserOwnNote;
