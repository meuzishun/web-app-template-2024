import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Post from './Post';
import { PostType } from '../types';
import { usePosts, useCreatePost } from '../hooks';
import { LoadingIndicator, ErrorComponent } from '~/components';

const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = usePosts();
  const createPostMutation = useCreatePost();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorComponent />;

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
      <Stack direction='column' gap={4}>
        {posts?.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </Box>
  );
};

export default PostList;
