
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import accountReducer from './accountReducer';
import authReducer from './authReducer';

export default combineReducers({
  posts: postReducer,
  account: accountReducer,
  auth: authReducer
});
