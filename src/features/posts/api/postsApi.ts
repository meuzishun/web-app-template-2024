import { axiosInstance } from '~/api';
import type { Post } from '../types';

const url = '/posts';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const createPost = async (newPost: Omit<Post, 'id'>) => {
  const response = await axiosInstance.post(url, newPost);
  return response.data;
};

export const updatePost = async (updatedPost: Post) => {
  const response = await axiosInstance.put(
    `${url}/${updatedPost.id}`,
    updatedPost
  );
  return response.data;
};

export const deletePost = async (id: number) => {
  await axiosInstance.delete(`${url}/${id}`);
};
