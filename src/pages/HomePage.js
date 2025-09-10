import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import TabBar from '../components/TabBar';
import PostDropdown from '../components/PostDropdown';
import PostCreator from '../components/PostCreator';
import UserSelection from '../components/UserSelection';
import PageSelection from '../components/PageSelection';
import { Link } from 'react-router-dom';
import { selectUser, selectPage } from '../redux/actions/accountActions';

function HomePage({ users, selectedUser, selectedPage, dispatch }) {
  const [selectedTab, setSelectedTab] = useState('post');
  const [postType, setPostType] = useState(null);
  const [step, setStep] = useState('select_type'); // select_type, select_user, select_page, create_post
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    setStep('select_type');
  };

  const handlePostTypeSelect = (type) => {
    setPostType(type);
    setStep('select_user');
  };

  const handleUserSelect = (userId) => {
    dispatch(selectUser(userId));
    setStep('select_page');
  };

  const handlePageSelect = (pageId) => {
    dispatch(selectPage(pageId));
    setStep('create_post');
  };

  const handleBack = () => {
    if (step === 'create_post') {
      setStep('select_page');
    } else if (step === 'select_page') {
      setStep('select_user');
    } else if (step === 'select_user') {
      setStep('select_type');
    }
  };

  const user = users.find(u => u.id === selectedUser);
  const pages = user ? user.pages : [];
  const page = pages.find(p => p.id === selectedPage);

  return (
    <div className="container mt-3">
      {isAuthenticated ? (
        <>
          <TabBar onSelect={handleTabSelect} />
          {selectedTab === 'post' && (
            <div className="mt-3">
              {step !== 'select_type' && (
                <button className="btn btn-secondary mb-3" onClick={handleBack}>
                  Back
                </button>
              )}
              {step === 'select_type' && <PostDropdown onSelect={handlePostTypeSelect} />}
              {step === 'select_user' && <UserSelection users={users} selectedUser={selectedUser} selectUser={handleUserSelect} />}
              {step === 'select_page' && <PageSelection pages={pages} selectedPage={selectedPage} selectPage={handlePageSelect} />}
              {step === 'create_post' && <PostCreator postType={postType} selectedAccount={page} />}
            </div>
          )}
        </>
      ) : (
        <div>
          <h2>Welcome to Facebook Tool</h2>
          <p>Please <Link to="/login">log in</Link> to create posts and manage your accounts.</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.account.users,
  selectedUser: state.account.selectedUser,
  selectedPage: state.account.selectedPage
});

export default connect(mapStateToProps)(HomePage);