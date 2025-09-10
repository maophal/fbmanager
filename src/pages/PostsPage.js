import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions/postActions';

function PostsPage({ posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Posts</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Recent Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="card mt-3">
              <div className="card-body">
                <p className="card-text">{post.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(PostsPage);
