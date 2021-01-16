import React, {createContext, useEffect, useState, useContext} from 'react';
import {ActivityIndicator, View, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {UserContext} from '../UserContext/UserContext';
import {storageService} from '../../Services/storageService';
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {Auth} from 'aws-amplify';
import config from '../../aws-exports';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as customqueries from '../../graphql/customqueries';
const limit = 10;
export const SearchContext = createContext();
export const SearchContextProvider = (props) => {
  const {user} = useContext(UserContext);
  const [searchedNotes, setSearchedNotes] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextToken, setNextToken] = useState();
  async function searchNote(filter) {
    console.log(filter);
    let result;
    setIsSearching(true);
    // {
    //   query: queries.listNotes,
    //   variables: { filter: filter},
    // }
    try {
      const allNotes = await API.graphql(
        graphqlOperation(queries.listNotes, {limit, filter}),
      );
      console.log(allNotes.data);
      console.log(allNotes.data.listNotes.items.length);
      setIsSearching(false);
      if (allNotes.data.listNotes.items.length === 0) {
        setModalVisible(true);
        result = false;
      } else {
        //let sortedNotes = sortNotesByCreatedAt(allNotes);
        setSearchedNotes(allNotes.data.listNotes.items);
        setNextToken(allNotes.data.listNotes.nextToken);
        result = true;
      }
    } catch (e) {
      console.log(e);
    }
    return result;
  }
  async function searchNotesWithNexToken(filter) {
    console.log(nextToken)
    if (nextToken !== null) {
      let firstOperation;
      firstOperation = await API.graphql(
        graphqlOperation(queries.listNotes, {
          limit: limit,
          filter: filter,
          nextToken: nextToken,
        }),
      );

      setNextToken(firstOperation.data.listNotes.nextToken);
      return firstOperation.data.listNotes.items;
    } else {
      return null;
    }
  }
  function sortNotesByCreatedAt(searchNotes) {
    let sortedArray = searchNotes.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedArray;
  }
  return (
    <SearchContext.Provider
      value={{
        searchNote,
        isSearching,
        modalVisible,
        setModalVisible,
        searchedNotes,
        setSearchedNotes,
        searchNotesWithNexToken,
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};
