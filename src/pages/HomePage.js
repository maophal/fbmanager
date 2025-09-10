import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import TabBar from '../components/TabBar';
import PostDropdown from '../components/PostDropdown';
import PostCreator from '../components/PostCreator';
import AccountSelection from '../components/AccountSelection';
import { Link } from 'react-router-dom';

function HomePage({ selectedAccount }) {
  const [selectedTab, setSelectedTab] = useState('post');
  const [postType, setPostType] = useState(null);
  const [step, setStep] = useState('select_type'); // select_type, select_account, create_post
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handlePostTypeSelect = (type) => {
    setPostType(type);
    setStep('select_account');
  };

  const handleAccountSelect = () => {
    setStep('create_post');
  };

  return (
    <div className="container mt-3">
      {isAuthenticated ? (
        <>
          <TabBar onSelect={setSelectedTab} />
          {selectedTab === 'post' && (
            <div className="mt-3">
              {step === 'select_type' && <PostDropdown onSelect={handlePostTypeSelect} />}
              {step === 'select_account' && <AccountSelection onNext={handleAccountSelect} />}
              {step === 'create_post' && <PostCreator postType={postType} selectedAccount={selectedAccount} />}
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
  selectedAccount: state.account.selectedAccount
});

export default connect(mapStateToProps)(HomePage);
