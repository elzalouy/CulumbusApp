import React from 'react';
import {createStackNavigator, StackNavigationOptions, } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import { NavigationScreenProps } from '@react-navigation/native';
import Home from '../screens/App/Home';
import Chat from '../screens/App/Chat';
import Adrenaline from '../screens/App/Adrenaline';
import EventDetails from '../screens/App/EventDetails';
import Reservation from '../screens/App/Reservation';
import Cities from '../screens/App/Cities';
import ReservationConfirmation from '../screens/App/ReservationConfirmation';
import CityOfTheDay from '../screens/App/CityOfTheDay';
import CountryRestrictions from '../screens/App/CountryRestrictions';
import HotelOffers from '../screens/App/HotelOffer';
import AllHotelOffers from '../screens/App/AllHotelOffers';

import { View, Dimensions } from 'react-native';
const w = (Dimensions.get('window').width);
const h = (Dimensions.get('window').height);

const HomeStack = createStackNavigator();

// type Props = NavigationScreenProps & {
//     gestureEnabled: true,
//   };
const screenOptions: StackNavigationOptions = {
    headerShown:false,
    headerLeft:null

  };


export default () => (

  <View style={{flex:1, paddingBottom:w*0.25,backgroundColor:'white'}}>
<HomeStack.Navigator initialRouteName="Home" 
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

 <HomeStack.Screen 
 options={screenOptions}
 name="Home" component={Home} 
 /> 
  <HomeStack.Screen  options={{headerShown: false}} name="Adrenaline" component={Adrenaline} /> 
  <HomeStack.Screen options={{ title:"" }} name="Chat" component={Chat} /> 
  <HomeStack.Screen options={{ headerShown: false }} name="EventDetails" component={EventDetails} /> 
  <HomeStack.Screen options={{ headerShown: false }} name="Reservation" component={Reservation} /> 
  <HomeStack.Screen options={{ headerShown: false }} name="Cities" component={Cities} /> 
  <HomeStack.Screen options={{ headerShown: false }} name="ReservationConfirmation" component={ReservationConfirmation} /> 
  

  <HomeStack.Screen options={{ headerShown: false }} name="CityOfTheDay" component={CityOfTheDay} /> 

  <HomeStack.Screen options={{ headerShown: false }} name="CountryRestrictions" component={CountryRestrictions} /> 
  
  <HomeStack.Screen options={{ headerShown: false }} name="HotelOffers" component={HotelOffers} /> 
  <HomeStack.Screen options={{ headerShown: false }} name="AllHotelOffers" component={AllHotelOffers} /> 
  
</HomeStack.Navigator>
<Chat />
</View>
);
