import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
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

  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 2,
      }}
    >
      <Stack direction='column' gap={4}>
        <Typography variant='h5'>{post.title}</Typography>
        <Typography variant='body1' sx={{ ml: 4 }}>
          {post.content}
        </Typography>
        <Stack direction='row' justifyContent='flex-end'>
          <IconButton onClick={() => handleUpdatePost(post)}>
            <EditIcon color='primary' />
          </IconButton>
          <IconButton onClick={() => handleDeletePost(post.id)}>
            <DeleteIcon color='warning' />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Post;
