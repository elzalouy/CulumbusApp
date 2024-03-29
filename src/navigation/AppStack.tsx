import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// import { NavigationScreenProps } from '@react-navigation/native';
import Profile from '../screens/App/Profile';
//import ContactUs from '../screens/App/ContactUs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import Logout from '../screens/Logout';
import AboutUs from '../screens/App/AboutUs';

import {View, Dimensions} from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// type Props = NavigationScreenProps & {
//     gestureEnabled: true,
//   };
const screenOptions: StackNavigationOptions = {
  headerShown: false,
  headerLeft: null,
};

export default () => (
  <Drawer.Navigator initialRouteName="Home" drawerPosition="right">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Profile" component={ProfileStack} />
    {/* <Drawer.Screen name="EditProfile" component={EditProfile} />
  <Drawer.Screen name="Cities Visited" component={Profile} /> */}
    <Drawer.Screen name="About Us" component={AboutUs} />
    {/* <Drawer.Screen name="Payment History" component={Profile} /> */}
    {/* <Drawer.Screen name="Contact Us" component={ContactUs} /> */}
    <Drawer.Screen name="Terms and conditions" component={Profile} />
    <Drawer.Screen name="Log Out" component={Logout} />
  </Drawer.Navigator>
);
