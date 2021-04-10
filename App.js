/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateNoteScreen from './screens/CreateNoteScreen/CreateNote';
import EditProfile from './screens/EditProfile/EditProfile';
import UserNotesScreen from './screens/UserNotesScreen/UserNotesScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import NotesScreen from './screens/NotesScreen/NotesScreen';
import SearchNotesScreen from './screens/SearchNotesScreen/SearchNotesScreen';
import ImageViewScreen from './screens/ImageViewScreen/ImageViewScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen/ShoppingCartScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditUserRight from './components/EditUserRight/EditUserRight';
import ShoppingCartRight from './components/ShoppingCartRight/ShoppingCartRight';
import GoBackCartScreen from './components/GoBackCartScreen/GoBackCartScreen';
import {UserContextProvider} from './contexts/UserContext/UserContext';
import {SearchContextProvider} from './contexts/SearchContext/SearchContext';
import {withAuthenticator, Authenticator} from 'aws-amplify-react-native';
import NetInfo from '@react-native-community/netinfo';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

import aws_exports from './aws-exports';

Amplify.configure({
  ...aws_exports,
  Analytics: {
    disabled: true,
  },
});
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home({navigation}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Notes') {
            return focused ? (
              <MaterialCommunityIcons name="note" size={24} color="#1F93FF" />
            ) : (
              <MaterialCommunityIcons
                name="note-outline"
                size={24}
                color="#B7C6D9"
              />
            );
          } else if (route.name === 'Create Note') {
            return focused ? (
              <Ionicons name="ios-add-circle" size={24} color="#1F93FF" />
            ) : (
              <Ionicons
                name="ios-add-circle-outline"
                size={24}
                color="#B7C6D9"
              />
            );
          } else if (route.name === 'Search Note') {
            return focused ? (
              <Ionicons name="search" size={24} color="#1F93FF" />
            ) : (
              <Ionicons name="search-outline" size={24} color="#B7C6D9" />
            );
          } else if (route.name === 'Profile') {
            return focused ? (
              <MaterialIcons name="person" size={24} color="#1F93FF" />
            ) : (
              <MaterialIcons name="person-outline" size={24} color="#B7C6D9" />
            );
          }
        },
      })}>
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen
        name="Create Note"
        component={NotesScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Create Note')}
            />
          ),
        }}
      />
      <Tab.Screen name="Search Note" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const App = () => {
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Anasayfa';

    switch (routeName) {
      case 'Notes':
        return 'Notes';
      case 'Create Note':
        return 'Create Note';
      case 'Search Note':
        return 'Search Note';
      case 'Profile':
        return 'Profile';
    }
  }
  function getHeaderIcon(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Notlar';
    switch (routeName) {
      case 'Notes':
        return '';
      case 'Create Note':
        return '';
      case 'Search Note':
        return '';
      case 'Profile':
        return '';
    }
  }

  return (
    <>
      <UserContextProvider>
        <SearchContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="ChooseNote"
                component={Home}
                options={({route}) => ({
                  //headerTitle: getHeaderTitle(route),
                  headerRight: () => <ShoppingCartRight />,
                  headerRightContainerStyle: styles.headerRightContStyle,
                })}
              />
              <Stack.Screen name="Create Note" component={CreateNoteScreen} />
              <Stack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={({route}) => ({
                  headerRight: () => <EditUserRight />,
                })}
              />

              <Stack.Screen
                name="For Sale"
                component={UserNotesScreen}
                options={({route}) => ({
                  headerRight: () => <ShoppingCartRight />,
                  headerRightContainerStyle: styles.headerRightContStyle,
                })}
              />
              <Stack.Screen
                name="Searched Notes"
                component={SearchNotesScreen}
                options={({route}) => ({
                  headerRight: () => <ShoppingCartRight />,
                  headerRightContainerStyle: styles.headerRightContStyle,
                })}
              />
              <Stack.Screen
                name="Image View"
                component={ImageViewScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Your Cart"
                component={ShoppingCartScreen}
                // options={({route}) => ({
                //   headerLeft: () => <GoBackCartScreen />,
                // })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SearchContextProvider>
      </UserContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  highlight: {
    fontWeight: '700',
  },
  headerRightContStyle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default withAuthenticator(App);
