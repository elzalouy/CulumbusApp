import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {} from 'react-native';

import {OFFERS, OFFERS_LOADING, SET_ASK} from './types';

import {client, LIST_HOTEL_OFFERS} from './queries';

export const listHotelOffers = () => {
  console.log('11111')
  return async (dispatch) => {
    // dispatch({type: LOGIN_LOADING, state:true})
    await client
      .query({
        query: LIST_HOTEL_OFFERS,
      })
      .then(function ({data: response}) {
        console.log(response);
        if ((response.listHotelOffers, 'repp')) {
          dispatch({type: OFFERS, offers: response.listHotelOffers});
        }
      })
      .catch(function (error) {
        console.log(error, 'err');
        console.log(error.data, 'err data');
        // dispatch({type: LOGIN_LOADING, state:false})
        // alert("This username or password is incorrect.")
      });
  };
};

export const setAskOffer = (offer, state) => {
  return async (dispatch) => {
    dispatch({type: SET_ASK, state: state, offer: offer});
  };
};
