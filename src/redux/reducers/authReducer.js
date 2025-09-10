import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
