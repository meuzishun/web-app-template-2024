import { useQuery } from '@tanstack/react-query';
import axiosInstance from '~/api/axios';

const fetchPosts = async () => {
  const response = await axiosInstance.get('/posts');
  return response.data;
};

export const usePosts = () => {
  return useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
};
