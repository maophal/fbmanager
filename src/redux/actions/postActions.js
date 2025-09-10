
import { FETCH_POSTS, NEW_POST } from './types';
import FacebookService from '../../services/FacebookService';

export const fetchPosts = () => dispatch => {
  console.log('fetching');
  const posts = [
      {
          id: 1,
          message: "hello world"
      },
      {
          id: 2,
          message: "hello world 2"
      }
  ]
  dispatch({
    type: FETCH_POSTS,
    payload: posts
  });
};

export const createPost = postData => async dispatch => {
  console.log('creating post with data:', postData);

  if (postData.type === 'video') {
    try {
      // Assuming postData.groups[0].items[0].videoId contains the simulated video ID
      const videoId = postData.groups[0].items[0].videoId;
      const response = await FacebookService.postVideoReel(postData.accountId, { ...postData, videoId });
      if (response.success) {
        dispatch({
          type: NEW_POST,
          payload: postData
        });
      }
    } catch (error) {
      console.error('Error posting video reel:', error);
    }
  } else {
    // Handle other post types here
    const post = {
        id: Date.now(),
        message: postData.text
    }
    dispatch({
      type: NEW_POST,
      payload: post
    });
  }
};
