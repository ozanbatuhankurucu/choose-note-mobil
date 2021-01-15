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
  Modal,
  LogBox,
} from 'react-native';
import {UserContext} from '../../contexts/UserContext/UserContext';
function ShoppingCartScreen({navigation}) {
  const {cartNotes} = useContext(UserContext);
  
  return (
    <>
      <View>
        <Text>laksfa</Text>
        <Text>{cartNotes.length !== 0 ? cartNotes[0].lesson : ''}</Text>
      </View>
    </>
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
  imageCont: {
    padding: 15,
    flexDirection: 'row',
  },
});

export default ShoppingCartScreen;
