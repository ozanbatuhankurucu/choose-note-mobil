import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext/UserContext';

import {TouchableOpacity} from 'react-native-gesture-handler';

function ShoppingCartRight() {
  const {
    updateUserInfo,
    setName,
    setImage,
    setUniversity,
    setDepartment,cartNotes
  } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Your Cart')}
        style={styles.profileHeaderIcon}>
        <View style={styles.shoppingCartCont}>
          <Text style={styles.shoppingCartText}>
            {cartNotes !== null ? cartNotes.length : '0'}
          </Text>
        </View>
        <FontAwesome5 name="shopping-cart" size={24} color="#251D21" />
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingCartRight;
//TODO Eger 100 den fazla not secilirse ona gore shoppingCortCont width heightlarini degistir dinamik olarak.
const styles = StyleSheet.create({
  updateProfile: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 16,
    fontWeight: '700',
    color: '#464647',
  },
  shoppingCartCont: {
    backgroundColor: 'rgba(95,197,123,0.8)',
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    zIndex: 1,
    justifyContent: 'center',
  },
  shoppingCartText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});
