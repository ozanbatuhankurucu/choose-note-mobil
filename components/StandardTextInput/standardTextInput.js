import React, { useState } from 'react'
import {
  TextInput,Dimensions
} from 'react-native'

let ScreenHeight = Dimensions.get('window').height
let ScreenWidth = Dimensions.get('window').width

export default function StandardTextInput({value,onChangeFunction,plcHolder,maxVal}) {
  
  return (
    <TextInput
      style={{
        height: 50,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        marginVertical:16,
        width:ScreenWidth*0.9
      
      }}
      maxLength={maxVal}
      onChangeText={(text) => onChangeFunction(text)}
      value={value}
      placeholder={plcHolder}
    />
  )
}
