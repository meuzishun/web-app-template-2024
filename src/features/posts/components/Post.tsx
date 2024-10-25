import React from 'react';
import { useUpdatePost, useDeletePost } from '../hooks';
import type { PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleUpdatePost = (post: PostType) => {
    updatePostMutation.mutate({ ...post, title: 'Updated Title' });
  };

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate(id);
  };

  return (
    <li>
      <h3>{post.title}</h3>
      <button onClick={() => handleUpdatePost(post)}>Update Post</button>
      <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
    </li>
  );
};

export default Post;
