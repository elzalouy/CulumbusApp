
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import {  } from 'react-native'


import { OFFERS, OFFERS_LOADING, SET_ASK } from './types';

import { client ,LIST_HOTEL_OFFERS  } from './queries';


export const listHotelOffers = () => {
    return async(dispatch) => {
    // dispatch({type: LOGIN_LOADING, state:true})
    await client.query({
        query: LIST_HOTEL_OFFERS }).then( function ({data:response}) {
            if(response.listHotelOffers){
        dispatch({type: OFFERS, offers:response.listHotelOffers})
    }
    })
    .catch(function (error) {
        console.log(error)
        console.log(error.data)
        // dispatch({type: LOGIN_LOADING, state:false})
        // alert("This username or password is incorrect.")
        })

    }

}


export const setAskOffer = (offer,state) => {
    return async(dispatch) => {
        dispatch({type: SET_ASK, state:state,offer:offer})
    }
}
