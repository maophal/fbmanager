import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FacebookProvider, Login } from 'react-facebook';
import { toast } from 'react-toastify';
import { setFacebookUserAndPages, selectUser, selectPage } from '../redux/actions/accountActions';
import FacebookService from '../services/FacebookService';

const FacebookAccountPage = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.account.users);

  const handleLogin = (response) => {
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
          {users.map(user => (
            <div className="card mt-4" key={user.id}>
              <div className="card-header">
                User: {user.name}
              </div>
              <div className="card-body">
                <h5 className="card-title">Pages</h5>
                <ul className="list-group">
                  {user.pages.map(page => (
                    <li key={page.id} className="list-group-item">{page.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="card mt-4">
            <div className="card-header">
              Add or Update Account
            </div>
            <div className="card-body">
              <p>To connect your Facebook pages, you must grant permission.</p>
              <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
                <Login
                  scope="public_profile,email,pages_read_engagement,pages_manage_posts"
                  onCompleted={handleLogin}
                  onError={(error) => {
                    console.error('Facebook Login Error:', error);
                    toast.error('Facebook login failed.');
                  }}
                >
                  {({ loading, handleClick }) => (
                    <button className="btn btn-primary btn-block" onClick={handleClick} disabled={loading}>
                      Login with Facebook to Manage Pages
                    </button>
                  )}
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
