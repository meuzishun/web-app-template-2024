import React from 'react';
import { usePosts, useCreatePost } from '../hooks';
import Post from './Post';

const PostList: React.FC = () => {
  const { data: posts, isLoading } = usePosts();
  const createPostMutation = useCreatePost();

  if (isLoading) return <div>Loading posts...</div>;

  const handleCreatePost = () => {
    createPostMutation.mutate({
      title: 'New Post',
      content: 'Content for new post',
      userId: 1,
    });
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleCreatePost}>Create Post</button>
      <ul>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
