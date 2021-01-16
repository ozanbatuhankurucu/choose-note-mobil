import React, {useContext} from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';

function GoBackCartScreen() {
  const navigation = useNavigation();
  const {searchedNotes, setSearchedNotes, searchNotesWithNexToken} = useContext(
    SearchContext,
  );
  return (
    <HeaderBackButton
      onPress={() => {
        console.log('geri butonu');
        setSearchedNotes(searchedNotes);
        navigation.goBack();
      }}
      title="Info"
    />
  );
}

export default GoBackCartScreen;
