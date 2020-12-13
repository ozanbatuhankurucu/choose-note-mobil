import React, {createContext, useEffect, useState} from 'react';
import {ActivityIndicator, View, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {storageService} from '../../Services/storageService';
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {Auth} from 'aws-amplify';
import config from '../../aws-exports';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as customqueries from '../../graphql/customqueries';

export const SearchContext = createContext();
export const SearchContextProvider = (props) => {
  const [searchedNotes, setSearchedNotes] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function addNotesWithPPUrls(notes) {
    console.log(notes[0].student.profilePicture)
    console.log(notes)
    for (const note of notes) {
      console.log(note.student.profilePicture.key);
      const tempPicUrl = await Storage.get(note.student.profilePicture.key);
      note.student.profilePicture = tempPicUrl

    }

    setSearchedNotes(notes);
  }
  async function searchNote(filter) {
    let result;
    setIsSearching(true);
    try {
      const allNotes = await API.graphql(
        graphqlOperation(queries.searchNotes, {
          sort: {
            field: 'id',
            direction: 'desc',
          },
          filter: filter,
        }),
      );
      console.log(allNotes.data.searchNotes.items);
      setIsSearching(false);
      if (allNotes.data.searchNotes.items.length === 0) {
        setModalVisible(true);
        result = false;
      } else {
        await addNotesWithPPUrls(allNotes.data.searchNotes.items);
        result = true;
        console.log(allNotes.data.searchNotes.items.length);
      }
      console.log(allNotes.data.searchNotes.items);
      console.log('----');
      console.log(allNotes.data.searchNotes.nextToken);
      console.log('----');
    } catch (e) {
      console.log(e);
    }
    return result;
  }
  return (
    <SearchContext.Provider
      value={{
        searchNote,
        isSearching,
        modalVisible,
        setModalVisible,
        searchedNotes,
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};
