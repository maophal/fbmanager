import { FETCH_ACCOUNTS, SELECT_ACCOUNT, SET_FACEBOOK_ACCOUNTS } from './types';
import FacebookService from '../../services/FacebookService';

export const fetchAccounts = () => dispatch => {
  const accounts = FacebookService.getAccounts();
  dispatch({
    type: FETCH_ACCOUNTS,
    payload: accounts
  });
};

export const selectAccount = (accountId) => dispatch => {
  dispatch({
    type: SELECT_ACCOUNT,
    payload: accountId
  });
};

export const setFacebookAccounts = (accounts) => dispatch => {
  dispatch({
    type: SET_FACEBOOK_ACCOUNTS,
    payload: accounts
  });
};