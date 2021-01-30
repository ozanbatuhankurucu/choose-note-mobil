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
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
const STORAGE_KEY = '@cartNotes';
export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [university, setUniversity] = useState(null);
  const [department, setDepartment] = useState(null);
  const [updateProfileIsLoading, setUpdateProfileIsLoading] = useState(false);
  const [nextToken, setNextToken] = useState();
  const [userNotes, setUserNotes] = useState(null);
  const [progressCircle, setProgressCircle] = useState(true);
  const [cartNotes, setCartNotes] = useState(null);
  const [totalAmountOfNotes, setTotalAmountOfNotes] = useState(null);
  async function checkUser() {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        // carttaki notlari cekiyoruz burada.
        await readData();
        setProgressCircle(true);
        try {
          const authUser = await Auth.currentAuthenticatedUser();
          const currentUser = await API.graphql(
            graphqlOperation(customqueries.getUser, {
              id: authUser.attributes.sub,
            }),
          );

          const notes = await getNotes(currentUser.data.getUser.owner);
          setUserNotes(notes);

          setUser(currentUser.data.getUser);
          setProgressCircle(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert('Your device does not have an internet connection!');
        setProgressCircle(true);
      }
    });
  }
  async function getNotes(owner) {
    let firstOperation;

    firstOperation = await API.graphql({
      query: queries.notesByOwner,
      variables: {
        owner: owner,
        sortDirection: 'DESC',
        limit: 10,
      },
    });

    setNextToken(firstOperation.data.notesByOwner.nextToken);

    return firstOperation.data.notesByOwner.items;
  }
  async function getNotesWithNexToken(owner) {
    if (nextToken !== null) {
      let firstOperation;
      firstOperation = await API.graphql({
        query: queries.notesByOwner,
        variables: {
          owner: owner,
          sortDirection: 'DESC',
          limit: 10,
          nextToken: nextToken,
        },
      });

      setNextToken(firstOperation.data.notesByOwner.nextToken);
      return firstOperation.data.notesByOwner.items;
    } else {
      return null;
    }
  }
  async function updateUserInfo() {
    let resultUrl;
    let resultUrlWithKey;
    if (
      image !== null ||
      name !== null ||
      university !== null ||
      department !== null
    ) {
      setUpdateProfileIsLoading(true);
      if (image !== null) {
        resultUrl = await storageService(image, 'profilePictures');
      }

      const userDetails = {
        id: user.id,
        profilePicture:
          resultUrl !== undefined ? resultUrl : user.profilePicture,
        name: name !== null ? name : user.name,
        university: university !== null ? university.name : user.university,
        department: department !== null ? department.name : user.department,
      };
      try {
        const updatedUser = await API.graphql({
          query: mutations.updateUser,
          variables: {
            input: userDetails,
          },
        });
        let updatedUserTemp = updatedUser.data.updateUser;

        setUser(updatedUserTemp);
        setUpdateProfileIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  }
  function addNoteToUserNotes(newNote) {
    setUserNotes((prev) => {
      const newArray = [newNote].concat(userNotes);
      return newArray;
    });
  }
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  const readData = async () => {
    try {
      const cartNotes = await AsyncStorage.getItem(STORAGE_KEY);

      if (cartNotes !== null) {
        setCartNotes(JSON.parse(cartNotes));
      } else {
        setCartNotes([]);
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage', e);
    }
  };
  const saveData = async (note) => {
    let tempArray = cartNotes;
    let newNote = {
      termID: note.termID,
      university: note.university,
      createdAt: note.createdAt,
      department: note.department,
      description: note.description,
      documentFiles: note.documentFiles,
      documents: note.documents,
      id: note.id,
      lesson: note.lesson,
      price: note.price,
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
    } catch (e) {
      console.log('Failed to save the data to the storage' + e);
    }
  };
  const removeData = async (note) => {
    const result = cartNotes.filter((item) => item.id !== note.id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setCartNotes(result);
    totalOfCart(result);
  };
  const totalOfCart = (cartNotes) => {
    let total = 0;
    if (cartNotes.length !== 0) {
      for (const prop in cartNotes) {
        total += cartNotes[prop].price;
        console.log(cartNotes[prop].price)
      }
      setTotalAmountOfNotes(total.toFixed(2));
    }
  };
  useEffect(() => {
    checkUser();
    //AsyncStorage.clear()
  }, []);

  return (
    <>
      {progressCircle === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      ) : (
        <UserContext.Provider
          value={{
            user,
            updateUserInfo,
            signOut,
            setImage,
            image,
            setName,
            setUniversity,
            setUpdateProfileIsLoading,
            updateProfileIsLoading,
            addNoteToUserNotes,
            setUser,
            getNotes,
            getNotesWithNexToken,
            userNotes,
            setUserNotes,
            setDepartment,
            setDepartment,
            cartNotes,
            saveData,
            removeData,
            totalAmountOfNotes,
            setTotalAmountOfNotes,
            totalOfCart,
          }}>
          {props.children}
        </UserContext.Provider>
      )}
    </>
  );
};

// await API.graphql({
//   query: queries.listNotes,
//   variables: {
//     owner: owner,
//     sortDirection: 'DESC',
//     limit: 10,
//   },
// });
