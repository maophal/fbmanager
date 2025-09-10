
import { FETCH_POSTS, NEW_POST } from './types';

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

export const createPost = postData => dispatch => {
  console.log('creating');
  const post = {
      id: Date.now(),
      message: postData.text
  }
  dispatch({
    type: NEW_POST,
    payload: post
  });
};
