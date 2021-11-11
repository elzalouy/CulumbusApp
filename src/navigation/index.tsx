import React, {useCallback, useEffect, useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import Loader from '../screens/Loading';
import AdminAppStack from './AdminAppStack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Loading from '../screens/Loading';

// const config = {
//   screens: {
//     Loading:'/product/:id',
//     Auth:'/auth'

//   },
// };

// const linking = {
//   prefixes: ['https://niche.com', 'niche://'],
//   config:config,
// };

const RootStack = createStackNavigator();

export default () => (
    <NavigationContainer 
  // linking={linking}
  >
    <RootStack.Navigator initialRouteName="Loading" 
        // headerMode="none"
        // screenOptions={{
        //   headerShown: false
        // }} 
        
        screenOptions={{
          headerTintColor: '#F5F5F4',
          headerStyle: {
             backgroundColor: '#0B121A' ,
             shadowColor: 'transparent',
             elevation: 0,
        },
        headerBackTitle:' ',
      }}
        >             
        <RootStack.Screen name="Loading" component={Loading} 
         options={{headerShown: false}} /> 
         <RootStack.Screen name="Auth" component={AuthStack} 
         options={{headerShown: false}} /> 
          <RootStack.Screen name="App" component={AppStack} 
         options={{headerShown: false}} /> 
        <RootStack.Screen name="AdminApp" component={AdminAppStack} 
         options={{headerShown: false}} /> 
     
    
        </RootStack.Navigator>
        {/* <Chat/> */}
        </NavigationContainer>
    );