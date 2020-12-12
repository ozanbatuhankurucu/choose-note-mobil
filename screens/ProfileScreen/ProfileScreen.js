import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import Auth from '@aws-amplify/auth';
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import {UserContext} from '../../contexts/UserContext/UserContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const {user} = useContext(UserContext);
  console.log(user.ppTemp)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Image View',[{url:user.ppTemp}])}>
          <Image
            source={{uri: user.ppTemp}}
            style={styles.pickUpImage}
          />

        
        </TouchableOpacity>
      </View>

      <View style={styles.usernameCont}>
        <Text style={styles.username}>{user.username}</Text>
      </View>

      <View style={styles.divider} />
      <Text style={{paddingHorizontal: 15, color: '#A5A5A6'}}>
        ACCOUNT SETTINGS
      </Text>
      <ProfileCard
        navigationPress={() => navigation.navigate('Edit Profile')}
        iconName="person-outline"
        title="Personal information"
      />
      <ProfileCard
        navigationPress={() => navigation.navigate('My Notes')}
        iconName="note-multiple-outline"
        title="My notes"
      />

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickUpImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 5,
  },
  spinnerTextStyle: {
    color: 'black',
  },
});
