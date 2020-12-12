import React from 'react';
import {View,Text,TextInput} from 'react-native';
export default function InputWithTitle({
  title,onChngText,defVal,maxLen
}) {
  return (
    <View style={{paddingHorizontal: 15, marginTop: 30}}>
      <Text style={{fontSize: 14, color: '#464647'}}>{title}</Text>
      <TextInput
        style={{
          height: 50,
          borderColor: 'gray',
          borderBottomWidth: 1,
          fontSize: 16,
          color: '#464647',
        }}
        onChangeText={(text) => onChngText(text)}
        defaultValue={defVal}
        maxLength={maxLen}
      />
    </View>
  );
}
