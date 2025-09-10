import { FETCH_ACCOUNTS, SELECT_USER, SELECT_PAGE, SET_FACEBOOK_USER_AND_PAGES } from './types';
import FacebookService from '../../services/FacebookService';

export const fetchFacebookData = () => dispatch => {
  const facebookData = FacebookService.getFacebookData();
  dispatch({
    type: FETCH_ACCOUNTS, // I will reuse FETCH_ACCOUNTS for now
    payload: facebookData
  });
};

export const selectUser = (userId) => dispatch => {
  dispatch({
    type: SELECT_USER,
    payload: userId
  });
};

export const selectPage = (pageId) => dispatch => {
  dispatch({
    type: SELECT_PAGE,
    payload: pageId
  });
};

export const setFacebookUserAndPages = (facebookData) => dispatch => {
  dispatch({
    type: SET_FACEBOOK_USER_AND_PAGES,
    payload: facebookData
  });
};