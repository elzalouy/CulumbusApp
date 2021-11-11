import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import ListChats from '../screens/AdminApp/ListChats';
import AdminChat from '../screens/AdminApp/AdminChat';
import Logout from '../screens/Logout';

import { View, Dimensions} from 'react-native';
const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

const AdminAppStack = createStackNavigator();

// type Props = NavigationScreenProps & {
//     gestureEnabled: true,
//   };
const screenOptions: StackNavigationOptions = {
    headerShown:false,
    headerLeft:null

  };


export default () => (
  <View style={{flex:1,backgroundColor:'white'}}>
<AdminAppStack.Navigator initialRouteName="ListChats" 
    
screenOptions={{
  headerTintColor: '#F5F5F4',
  headerStyle: {
     backgroundColor: '#0B121A' ,
     shadowColor: 'transparent',
     elevation: 0,
     shadowOpacity: 0
},
title:"",

// headerBackTitle:' ',
}}
>             

 <AdminAppStack.Screen 
 options={screenOptions}
 name="ListChats" component={ListChats} 
 /> 
  <AdminAppStack.Screen  options={{headerShown: false}} name="AdminChat" component={AdminChat} /> 
  <AdminAppStack.Screen options={{headerShown: false}} name="Logout" component={Logout} /> 

</AdminAppStack.Navigator>
{/* <Chat/> */}
</View>
);
