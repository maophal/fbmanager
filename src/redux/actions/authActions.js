import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';
import { toast } from 'react-toastify';

export const login = (username, password) => dispatch => {
  // Mock login
  if (username === 'admin' && password === 'password') {
    dispatch({ type: LOGIN_SUCCESS });
    toast.success('Logged in successfully!');
  } else {
    dispatch({ type: LOGIN_FAIL });
    toast.error('Invalid credentials.');
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  toast.info('Logged out.');
};

export const signup = (email, password) => dispatch => {
  // Mock signup
  if (email && password) {
    dispatch({ type: SIGNUP_SUCCESS });
    toast.success('Signed up successfully!');
  } else {
    dispatch({ type: SIGNUP_FAIL });
    toast.error('Sign up failed.');
  }
};
