import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FacebookProvider, Login } from 'react-facebook';
import { toast } from 'react-toastify';
import { setFacebookAccounts, selectAccount } from '../redux/actions/accountActions';
import AccountSelection from '../components/AccountSelection';
import FacebookService from '../services/FacebookService';

const FacebookAccountPage = () => {
  const dispatch = useDispatch();

  const accounts = useSelector(state => state.account.items);
  const selectedAccount = useSelector(state => state.account.selectedAccount);

  const handleAccountSelection = (accountId) => {
    dispatch(selectAccount(accountId));
  };

  const handleLogin = (response) => {
    console.log('Facebook login response:', response);
    if (response.status === 'connected') {
      FacebookService.handleFacebookAccountLogin(response, dispatch);
    } else {
      toast.error('Facebook login failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Facebook Accounts</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              Your Connected Pages
            </div>
            <div className="card-body">
              <AccountSelection accounts={accounts} selectedAccount={selectedAccount} selectAccount={handleAccountSelection} />
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              Add a New Account
            </div>
            <div className="card-body">
              <p>To connect your Facebook pages, you must grant permission.</p>
              <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
                <Login
                  scope="public_profile,email,pages_read_engagement,pages_manage_posts"
                  onSuccess={handleLogin}
                  onError={(error) => {
                    console.error('Facebook Login Error:', error);
                    toast.error('Facebook login failed.');
                  }}
                >
                  Connect with Facebook
                  {/* {({ loading, handleClick }) => {
                    console.log('Facebook Login render props:', { loading });
                    return (
                      <button className="btn btn-primary btn-block" onClick={handleClick} disabled={loading}>
                       Connect with Facebook
                      </button>
                    );
                  }} */}
                </Login>
              </FacebookProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookAccountPage;
