import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Start from '../screens/Auth/Start';
import Register from '../screens/Auth/Register';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import VerifyForgetCode from '../screens/Auth/VerifyForgetCode';
import ResetPassword from '../screens/Auth/ResetPassword';
import ForgetSuccess from '../screens/Auth/ForgetSuccess';

const AuthStack = createStackNavigator();

export default () => (
<AuthStack.Navigator initialRouteName="Start" 
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

     <AuthStack.Screen name="Start" component={Start} 
     options={{headerShown: false}} /> 
      <AuthStack.Screen name="Login" component={Login} 
     options={{headerShown: false}} /> 
    <AuthStack.Screen name="Register" component={Register} 
     options={{headerShown: false}} />
     <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} 
     options={{headerShown: false}} /> 
    <AuthStack.Screen name="VerifyForgetCode" component={VerifyForgetCode} 
     options={{headerShown: false}} /> 
     <AuthStack.Screen name="ResetPassword" component={ResetPassword} 
     options={{headerShown: false}} /> 
     <AuthStack.Screen name="ForgetSuccess" component={ForgetSuccess} 
     options={{headerShown: false}} /> 
 
    </AuthStack.Navigator>
);