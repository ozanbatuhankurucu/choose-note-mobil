import React, {useContext} from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';

function GoBackCartScreen() {
  const navigation = useNavigation();
  const {
    searchedNotes,
    setSearchedNotes,
    searchNotesWithNexToken,
    tempSearchedNotes,
  } = useContext(SearchContext);
  return (
    <HeaderBackButton
      onPress={() => {
        navigation.navigate('NoteUp');
      }}
      title="Info"
    />
  );
}

export default GoBackCartScreen;
