import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Post from './Post';
import { usePosts, useCreatePost } from '../hooks';

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
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Posts
        </Typography>
        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={handleCreatePost}
        >
          Create Post
        </Button>
      </Stack>
      <List>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </List>
    </Box>
  );
};

export default PostList;
