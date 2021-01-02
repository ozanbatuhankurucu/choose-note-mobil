import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
function PostIcon({iconText, iconName, iconSize, isDifferentStyle}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
      <View style={{flex: 1, padding: 3}}>
        <FontAwesome name={iconName} size={iconSize} color="black" />
      </View>
      <View style={{flex: 7}}>
        <Text
          style={
            isDifferentStyle === true
              ? {fontSize: 11, textDecorationLine: 'underline', color: 'blue'}
              : {fontSize: 11}
          }>
          {iconText}
        </Text>
      </View>
    </View>
  );
}

export default PostIcon;
