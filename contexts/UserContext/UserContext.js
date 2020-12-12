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
const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;
export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [university, setUniversity] = useState(null);
  const [updateProfileIsLoading, setUpdateProfileIsLoading] = useState(false);
  const [nextToken, setNextToken] = useState();
  const [userNotes, setUserNotes] = useState(null);
  const [progressCircle, setProgressCircle] = useState(false);
  async function checkUser() {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        setProgressCircle(true);
        try {
          const authUser = await Auth.currentAuthenticatedUser();
          const currentUser = await API.graphql(
            graphqlOperation(customqueries.getUser, {
              id: authUser.attributes.sub,
            }),
          );

          const ppUrl = await Storage.get(
            currentUser.data.getUser.profilePicture.key,
          );
          console.log('---------');
          console.log(ppUrl + '34');
          // console.log(currentUser);
          console.log(currentUser.data.getUser.owner)
          currentUser.data.getUser.ppTemp = ppUrl;
          const notes = await getNotes(currentUser.data.getUser.owner);
          setUserNotes(notes);
          setUser(currentUser.data.getUser);
          setProgressCircle(false);
          console.log('user', currentUser.data.getUser);
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert('Your device does not have an internet connection!');
        setProgressCircle(true);
      }
    });
  }
  console.log(nextToken);
  async function getNotes(owner) {
    // const { data: { listProducts: { items: itemsPage1, nextToken } } } = await API.graphql({ query: listProducts, variables: { limit: 20, /* add filter as needed */ }}));
    let firstOperation;
    console.log(nextToken + 'nextTokeni bastigim yer');

    console.log('next token null 43');
    firstOperation = await API.graphql({
      query: queries.listNotes,
      variables: {
        owner: owner,
        sortDirection: 'DESC',
        limit: 10,
      },
    });
    console.log(firstOperation.data.listNotes.nextToken);
    setNextToken(firstOperation.data.listNotes.nextToken);

    console.log('satir 50');
    console.log(firstOperation.data.listNotes.items);
    return firstOperation.data.listNotes.items;
  }
  async function getNotesWithNexToken(userId) {
    console.log(nextToken + 'nextTokeni bastigim yer withNextToken');

    if (nextToken !== null) {
      let firstOperation;
      firstOperation = await API.graphql({
        query: queries.listNotes,
        variables: {
          studentId: userId,
          sortDirection: 'DESC',
          limit: 10,
          nextToken: nextToken,
        },
      });
      console.log(firstOperation.data.listNotes);
      setNextToken(firstOperation.data.listNotes.nextToken);
      return firstOperation.data.listNotes.items;
    } else {
      return null;
    }
  }
  async function updateUserInfo() {
    console.log('contextten tiklandi kanka satir 24');
    let resultUrl;
    let resultUrlWithKey;
    if (image !== null || name !== null || university !== null) {
      console.log('icerdeyim baba 29.satir');
      setUpdateProfileIsLoading(true);
      if (image !== null) {
        resultUrl = await storageService(image, 'profilePictures');
        resultUrlWithKey = resultUrl;
        resultUrl = await Storage.get(resultUrl);
      }
      console.log(user.id);
      console.log(resultUrl);

      const newProfilePicture = {
        ...user.profilePicture,
        key: resultUrlWithKey,
      };
      const userDetails = {
        id: user.id,
        profilePicture:
          resultUrl !== undefined ? newProfilePicture : user.profilePicture,
        name: name !== null ? name : user.name,
        university: university !== null ? university : user.university,
      };
      try {
        const updatedUser = await API.graphql({
          query: mutations.updateUser,
          variables: {
            input: userDetails,
          },
        });
        let updatedUserTemp = updatedUser.data.updateUser;
        if (resultUrl !== undefined) {
          updatedUserTemp.ppTemp = resultUrl;
        } else {
          updatedUserTemp.ppTemp = user.ppTemp;
        }

        console.log(updatedUserTemp);
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
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {progressCircle ? (
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
          }}>
          {props.children}
        </UserContext.Provider>
      )}
    </>
  );
};
