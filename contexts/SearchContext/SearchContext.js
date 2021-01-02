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

  async function searchNote(filter) {
    let result;
    setIsSearching(true);

    try {
      const allNotes = await API.graphql({
        query: queries.listNotes,
        variables: {filter: filter},
      });
      console.log(allNotes.data.listNotes.items);
      setIsSearching(false);
      if (allNotes.data.listNotes.items.length === 0) {
        setModalVisible(true);
        result = false;
      } else {
        setSearchedNotes(allNotes.data.listNotes.items);
        result = true;
        console.log(allNotes.data.listNotes.items.length);
      }
      console.log(allNotes.data.listNotes.items);
      console.log('----');
      console.log(allNotes.data.listNotes.nextToken);
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
