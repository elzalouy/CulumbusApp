import { DELETE_MSG } from '../actions/types';


const initialState = {
    messageDeleted:''
  }
  
  export default (state = initialState , action) => {
    // console.log(action.type)
    switch(action.type){
      case DELETE_MSG :  return {...state,messageDeleted:action.id};
    
      default: return state;
    }
  }