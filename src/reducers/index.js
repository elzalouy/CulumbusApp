import { combineReducers } from 'redux';
import authReducer from './authReducer';
import venuesReducer from './venuesReducer';
import reservationReducer from './reservationReducer';
import chatsReducer from './chatsReducer';
import restrictionsReducer from './restrictionsReducer';
import hotelsReducer from './hotelsReducer';



export default combineReducers({
  auth:authReducer,
  venues:venuesReducer,
  reservation:reservationReducer,
  chats:chatsReducer,
  restrictions:restrictionsReducer,
  hotels:hotelsReducer
});
