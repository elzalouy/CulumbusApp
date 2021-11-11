import { LOGIN_LOADING, USER, USER_ONLY} from '../actions/types';


const initialState = {
  user:{},
  token:'',
  loading:false,
 
  }
  
  export default (state = initialState , action) => {
    // console.log(action.type)
    switch(action.type){
      case USER :  return {...state,user: action.user,token:action.token};
      case USER_ONLY :  return {...state,user: action.user};
      case LOGIN_LOADING :  return {...state,loading: action.state};
    
      default: return state;
    }
  }