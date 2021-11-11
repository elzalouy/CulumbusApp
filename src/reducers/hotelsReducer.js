import {  OFFERS, OFFERS_LOADING, SET_ASK } from '../actions/types';


const initialState = {
  offers:[],
  offersLoading:false,
  askForOffer:false,
  currentOffer:{}
  }
  
  export default (state = initialState , action) => {
    // console.log(action.type)
    switch(action.type){
        case OFFERS : return {...state,offers: action.offers};
        case OFFERS_LOADING :  return {...state,offersLoading: action.state};
        case SET_ASK : return {...state,askForOffer: action.state,currentOffer:action.offer};

      default: return state;
    }
  }