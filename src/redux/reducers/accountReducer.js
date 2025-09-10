import { FETCH_ACCOUNTS, SELECT_ACCOUNT, SET_FACEBOOK_ACCOUNTS } from '../actions/types';

const initialState = {
  items: [],
  selectedAccount: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        ...state,
        items: action.payload
      };
    case SELECT_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload
      };
    case SET_FACEBOOK_ACCOUNTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
