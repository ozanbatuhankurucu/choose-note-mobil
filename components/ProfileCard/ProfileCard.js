import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function ProfileCard({navigationPress, title, iconName}) {
  function iconSelector(iconN) {
    if (iconN === 'person-outline') {
      return (
        <Ionicons name="person-outline" size={24} color="#464647"></Ionicons>
      );
    } else if (iconN === 'note-multiple-outline') {
      return (
        <MaterialCommunityIcons
          name="note-multiple-outline"
          size={24}
          color="#464647"></MaterialCommunityIcons>
      );
    } else {
      return <FontAwesome name="sign-out" size={24} color="#464647" />;
    }
  }

  return (
    <TouchableOpacity onPress={navigationPress}>
      <View style={{paddingHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{color: '#464647', fontSize: 16}}>{title}</Text>
          {iconSelector(iconName)}
        </View>
        <View style={{borderBottomColor: '#F4F4F4', borderBottomWidth: 2}} />
      </View>
    </TouchableOpacity>
  );
}

export default ProfileCard;
