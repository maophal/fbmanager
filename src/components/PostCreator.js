import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/postActions';
import UrlFetcher from './UrlFetcher';

const PostCreator = ({ postType, selectedAccount, createPost }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [hasContent, setHasContent] = useState(false);

  const handlePost = () => {
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }

    if (postType === 'image' || postType === 'video') {
      const postData = {
        accountId: selectedAccount,
        type: postType,
        groups: selectedGroups,
      };
      console.log('Post Data:', postData); // Added console.log
      createPost(postData);
      setSelectedGroups([]);
    } else {
        // Handle text post if needed
    }
  };

  if (!postType) {
    return null;
  }

  return (
    <div className="mt-3">
      {(postType === 'image' || postType === 'video') && (
        <UrlFetcher
          postType={postType}
          onSelectionChange={setSelectedGroups}
          onContentLoaded={setHasContent}
        />
      )}
      {hasContent && (
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" onClick={handlePost}>Post</button>
        </div>
      )}
    </div>
  );
};

export default connect(null, { createPost })(PostCreator);