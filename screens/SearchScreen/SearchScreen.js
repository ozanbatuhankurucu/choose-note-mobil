import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import universitiesData from '../../Datas/universities.json';
import departmentsData from '../../Datas/departments.json';
import {terms} from '../../Datas/dropdownDatas';
import SearchDropdown from '../../components/SearchDropdown/searchDropdown';
import StandardTextInput from '../../components/StandardTextInput/standardTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
export default function SearchScreen() {
  const [university, setUniversity] = useState(null);
  const [term, setTerm] = useState(null);
  const [department, setDepartment] = useState(null);
  const [lesson, setLesson] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedNotes, setSearchedNotes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(searchedNotes);
  async function searchNote() {
    setIsSearching(true);
    let filterArray = [];

    if (university !== null) {
      filterArray.push({university: {eq: university.name}});
    }
    if (term !== null) {
      filterArray.push({termID: {eq: term.id}});
    }
    if (department !== null) {
      filterArray.push({department: {eq: department.name}});
    }
    if (lesson !== '') {
      filterArray.push({lesson: {contains: lesson}});
    }
    console.log(filterArray);
    //   let filter = {
    //     or: [{ priority: {eq:1} },
    //          { priority: {eq:2} }]
    // };
    let filter = {
      and: filterArray,
    };
    try {
      const resultNotes = await API.graphql({
        query: queries.listNotes,
        variables: {filter: filter},
      });
      console.log('----');
      console.log(resultNotes.data.listNotes.items);
      console.log(resultNotes.data.listNotes.items.length);
      setIsSearching(false);
      if(resultNotes.data.listNotes.items.length===0){
        setModalVisible(true)
      }else{
        setSearchedNotes(resultNotes.data.listNotes.items);
      }
      
    } catch (e) {
      console.log(e);
    }
  }
  function searchBtnDisableControl() {
    if (
      university !== null ||
      department !== null ||
      term !== null ||
      lesson !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <>
      {isSearching === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
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
                    setDepartment(null)
                    setUniversity(null)
                    setTerm(null)
                    setLesson('')
                  }}></Entypo>
                <View>
                  <Text style={styles.noResultMessage}>
                    We couldn't find any results
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>University</Text>
            <SearchDropdown
              items={universitiesData}
              onItemSelect={setUniversity}
              placeHolder="Select university"
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>Department</Text>
            <SearchDropdown
              items={departmentsData}
              onItemSelect={setDepartment}
              placeHolder="Enter Department"
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>
              Term of lesson
            </Text>
            <SearchDropdown
              items={terms}
              onItemSelect={setTerm}
              placeHolder="Select term"
            />
          </View>
          <View>
            <Text style={{marginTop: 5, fontWeight: '700'}}>Lesson Name</Text>
            <StandardTextInput
              onChangeFunction={setLesson}
              plcHolder="Lesson name"
              value={lesson}
              maxVal={60}
            />
          </View>
          <TouchableOpacity
            disabled={searchBtnDisableControl()}
            style={{
              width: ScreenWidth * 0.9,
              marginTop: 40,
              marginBottom: 20,
              justifyContent: 'center',
              height: 50,
              borderRadius: 5,
              backgroundColor:
                searchBtnDisableControl() === true ? '#CCC' : '#8ad7c1',
            }}
            onPress={() => searchNote()}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              SEARCH NOTE
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
  noResultMessage: {
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
