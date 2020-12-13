import React, {useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dimensions} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
export default function SearchDropdown({
  placeHolder,
  items,
  onItemSelect
 

}) {
  String.prototype.turkishToLower = function () {
    var string = this;
    var letters = {İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç'};
    string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function (letter) {
      return letters[letter];
    });
    return string.toLowerCase();
  };
  return (
    <SearchableDropdown
      onItemSelect={(item) => {
        console.log(item)
        onItemSelect(item)
      }}
      containerStyle={{paddingVertical: 8, width: ScreenWidth * 0.9}}
      itemStyle={{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
      }}
      itemTextStyle={{color: '#222'}}
      itemsContainerStyle={{maxHeight: 200}}
      items={items}
      textInputProps={{
        placeholder: placeHolder,
        underlineColorAndroid: 'transparent',
        style: {
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        },
        //onTextChange: (text) => alert(text),
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
      setSort={(item, searchedText) =>
        item.name.turkishToLower().startsWith(searchedText.turkishToLower())
      }
    />
  );
}
