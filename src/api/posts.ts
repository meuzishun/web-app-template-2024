import axiosInstance from '~/api/axios';
import { Post } from '~/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('/posts');
  return response.data;
};

export const createPost = async (newPost: Omit<Post, 'id'>) => {
  const response = await axiosInstance.post('/posts', newPost);
  return response.data;
};

export const updatePost = async (updatedPost: Post) => {
  const response = await axiosInstance.put(
    `/posts/${updatedPost.id}`,
    updatedPost
  );
  return response.data;
};

export const deletePost = async (id: number) => {
  await axiosInstance.delete(`/posts/${id}`);
};
