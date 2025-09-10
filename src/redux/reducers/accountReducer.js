import { FETCH_ACCOUNTS, SELECT_USER, SELECT_PAGE, SET_FACEBOOK_USER_AND_PAGES } from '../actions/types';

const initialState = {
  users: [
    {
      id: 'user-1',
      name: 'Default User 1',
      pages: [
        { id: 'page-1-1', name: 'Sample Page 1.1', accessToken: 'token-1-1' },
        { id: 'page-1-2', name: 'Sample Page 1.2', accessToken: 'token-1-2' },
        { id: 'page-1-3', name: 'Sample Page 1.3', accessToken: 'token-1-3' },
      ]
    },
    {
      id: 'user-2',
      name: 'Default User 2',
      pages: [
        { id: 'page-2-1', name: 'Sample Page 2.1', accessToken: 'token-2-1' },
        { id: 'page-2-2', name: 'Sample Page 2.2', accessToken: 'token-2-2' },
      ]
    }
  ],
  selectedUser: null,
  selectedPage: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      // This needs to be adapted to the new data structure from the API
      return {
        ...state,
        users: action.payload ? action.payload.users : [],
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
        selectedPage: null // Reset selected page when user changes
      };
    case SELECT_PAGE:
      return {
        ...state,
        selectedPage: action.payload
      };
    case SET_FACEBOOK_USER_AND_PAGES:
      // This needs to be adapted to handle multiple users
      // For now, it will overwrite the users array with a single user
      return {
        ...state,
        users: [action.payload]
      };
    default:
      return state;
  }
}
