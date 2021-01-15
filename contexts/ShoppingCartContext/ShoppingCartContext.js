import React, {createContext, useEffect, useState} from 'react';
import {ActivityIndicator, View, Alert, AsyncStorage} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {storageService} from '../../Services/storageService';
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {Auth} from 'aws-amplify';
import config from '../../aws-exports';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as customqueries from '../../graphql/customqueries';
const STORAGE_KEY = '@cartNotes';
export const ShoppingCartContext = createContext();
export const ShoppingCartContextProvider = (props) => {
  const [cartNotes, setCartNotes] = useState(null);

  

  const saveData = async (note) => {

    let tempArray = cartNotes;
    let newNote = {
      createdAt: note.createdAt,
      department: note.department,
      description: note.description,
      documentFiles: note.documentFiles,
      documents: note.documents,
      id: note.id,
      lesson: note.lesson,
      owner: note.owner,
      price: note.price,
      ownerPP: note.student.profilePicture,
    };

    try {
      let cartNotes = [];
      await AsyncStorage.getItem(STORAGE_KEY)
        .then((res) => {
          if (res !== null) {
            cartNotes = JSON.parse(res);
          }
        })
        .catch((err) => console.log(err));
      cartNotes.push(newNote);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartNotes));
      setCartNotes(cartNotes);
      console.log(cartNotes.length + '=> cartNotes length');
    } catch (e) {
      console.log('Failed to save the data to the storage' + e);
    }
  };

  const readData = async () => {
    setProgressCircle(true);
    try {
      const cartNotes = await AsyncStorage.getItem(STORAGE_KEY);
     
      if (cartNotes !== null) {
        setCartNotes(JSON.parse(cartNotes));
      } else {
        setCartNotes([]);
      }
      setProgressCircle(false);
    } catch (e) {
      console.log('Failed to fetch the data from storage', e);
    }
  };
  useEffect(() => {
    readData();
    //saveData();
    //AsyncStorage.clear()
  }, []);
  return (
    <>
      <ShoppingCartContext.Provider value={{cartNotes, saveData}}>
        {props.children}
      </ShoppingCartContext.Provider>
    </>
  );
};
