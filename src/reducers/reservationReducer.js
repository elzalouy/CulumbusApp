import { DATES, TIMINGS, TIMINGS_LOADING } from '../actions/types';


const initialState = {
  dates:[],
  timings:[],
  timingsLoading:false
  }
  
  export default (state = initialState , action) => {
    // console.log(action.type)
    switch(action.type){
      case DATES :  return {...state,dates: action.dates};
      case TIMINGS :  return {...state,timings: action.timings};
      case TIMINGS_LOADING :  return {...state,timingsLoading: action.status};
    
      default: return state;
    }
  }