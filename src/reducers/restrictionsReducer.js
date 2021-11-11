import { RESTRICTIONS, RESTRICTIONS_LOADING } from '../actions/types';


const initialState = {
  restrictions:[],
  restrictionsLoading:false
  }
  
  export default (state = initialState , action) => {
    // console.log(action.type)
    switch(action.type){
      case RESTRICTIONS :  return {...state,restrictions: action.restrictions};
      case RESTRICTIONS_LOADING :  return {...state,restrictionsLoading: action.state};
      
      default: return state;
    }
  }