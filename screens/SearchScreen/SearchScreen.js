import 'react-native-gesture-handler';
import React, {useState, useEffect,useContext} from 'react';
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
import {API,graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
export default function SearchScreen({navigation}) {
  const [university, setUniversity] = useState(null);
  const [term, setTerm] = useState(null);
  const [department, setDepartment] = useState(null);
  const [lesson, setLesson] = useState('');
  
  const {searchNote,isSearching,modalVisible,setModalVisible} = useContext(SearchContext);

  async function getInputDatas() {
  
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
    
    let filter = {
      and: filterArray,
    };
    const searchNavigationResult = await searchNote(filter)
    console.log(searchNavigationResult)
    if(searchNavigationResult===true){
      setUniversity(null)
      setTerm(null)
      setDepartment(null)
      setLesson('')
      navigation.navigate('Searched Notes')
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
                    setDepartment(null);
                    setUniversity(null);
                    setTerm(null);
                    setLesson('');
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
            onPress={() => getInputDatas()}>
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
