
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/postActions';

const PostCreator = ({ postType, selectedAccount, createPost }) => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handlePost = () => {
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
    let postData = { accountId: selectedAccount };
    switch (postType) {
      case 'text':
        postData = { ...postData, type: 'text', text };
        break;
      case 'image':
        postData = { ...postData, type: 'image', text, imageUrl };
        break;
      case 'video':
        postData = { ...postData, type: 'video', text, videoUrl };
        break;
      default:
        return;
    }
    createPost(postData);
    setText('');
    setImageUrl('');
    setVideoUrl('');
  };

  if (!postType) {
    return null;
  }

  return (
    <div className="mt-3">
      <div className="form-group">
        <textarea className="form-control" rows="3" placeholder="What's on your mind?" value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </div>
      {postType === 'image' && (
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      )}
      {postType === 'video' && (
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
      )}
      <button className="btn btn-primary" onClick={handlePost}>Post</button>
    </div>
  );
};

export default connect(null, { createPost })(PostCreator);
