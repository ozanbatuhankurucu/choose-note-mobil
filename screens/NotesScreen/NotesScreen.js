import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect} from 'react';
import {Auth, graphqlOperation} from 'aws-amplify';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView, Platform,Alert 
} from 'react-native';
import moment from 'moment';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export default function NotesScreen() {
  const [allNotes, setAllNotes] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      getNotes();
      setRefreshing(false);
    });
  }, []);

  const getNotes = async () => {
    const allNotes = await API.graphql(graphqlOperation(queries.listNotes));

    setAllNotes(allNotes.data.listNotes.items);
    //console.log(allNotes.data.listNotes.items); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
  };
 
 

  useEffect(() => {
    //getNotes();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    ></ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const allNotes = await API.graphql(
//   graphqlOperation(queries.searchNotes, {
//     sort: {
//       field: 'lesson',
//       direction: 'asc',
//     },
//     filter: {
//       and: [
//         {
//           cityID: {
//             eq: 8,
//           },
//         },
//         {
//           university: {
//             eq: 'ARTVİN ÇORUH ÜNİVERSİTESİ',
//           },
//         },
//         {
//           department: {
//             matchPhrasePrefix: 'Bilgiler',
//           },
//         },
//         {
//           lesson: {
//             matchPhrasePrefix: 'Tar',
//           },
//         },
//         {
//           termID: {
//             eq: 3,
//           },
//         },
//       ],
//     },
//   }),
// );

// {allNotes !== null ? (
//   allNotes.map((note, index) => {
//     return (
//       <View key={note.id} style={{borderWidth: 1}}>
//         {/* <Text>{note.documents[0].url}</Text>
//           <Image
//             style={{width: 50, height: 50, borderRadius: 30}}
//             source={{uri: note.documents[0].url}}
//           /> */}
//         <Text>Department : {note.department}</Text>
//         <Text>Lesson : {note.lesson}</Text>
//         <Text>Owner : {note.owner}</Text>
//         <Text>University : {note.university}</Text>
//         <Text> {moment(note.createdAt).format('LLLL')}</Text>
//       </View>
//     );
//   })
// ) : null}
