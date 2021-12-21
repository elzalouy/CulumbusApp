import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

// import { NavigationScreenProps } from '@react-navigation/native';
import Profile from '../screens/App/Profile';
import EditProfile from '../screens/App/EditProfile';

import {View, Dimensions} from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ProfileStack = createStackNavigator();

// type Props = NavigationScreenProps & {
//     gestureEnabled: true,
//   };
const screenOptions: StackNavigationOptions = {
  headerShown: false,
  headerLeft: null,
};

export default () => (
  <View style={{flex: 1, paddingBottom: w * 0.25, backgroundColor: 'white'}}>
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTintColor: '#F5F5F4',
        headerStyle: {
          backgroundColor: '#0B121A',
          shadowColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        title: '',
      }}>
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
    </ProfileStack.Navigator>
  </View>
);
