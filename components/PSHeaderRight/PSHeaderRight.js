import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext/UserContext';

function PSHeaderRight({whichOperation}) {
  const {
    signOut,
    updateUserInfo,
    setName,
    setImage,
    setUniversity,
    setIsConnectedForUpdate,
    isConnectedForUpdate,
  } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.profileHeaderIcon}>
      {whichOperation === 'signOut' ? (
        <FontAwesome
          name="sign-out"
          size={24}
          color="#403A3A"
          onPress={signOut}
        />
      ) : (
        <Text
          style={styles.updateProfile}
          onPress={async () => {
            await updateUserInfo();
            setName(null);
            setUniversity(null);
            setImage(null);
            navigation.goBack();
          }}>
          Save
        </Text>
      )}
    </View>
  );
}

export default PSHeaderRight;

const styles = StyleSheet.create({
  profileHeaderIcon: {
    marginTop: 10,
    marginRight: 10,
  },
  updateProfile: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 16,
    fontWeight: '700',
    color: '#464647',
  },
});
