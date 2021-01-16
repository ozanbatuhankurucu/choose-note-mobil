import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext/UserContext';

function EditUserRight() {
  const {
    updateUserInfo,
    setName,
    setImage,
    setUniversity,
    setDepartment,
  } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={styles.updateProfile}
        onPress={async () => {
          await updateUserInfo();
          setName(null);
          setUniversity(null);
          setDepartment(null);
          setImage(null);
          navigation.goBack();
        }}>
        Save
      </Text>
    </View>
  );
}

export default EditUserRight;

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
