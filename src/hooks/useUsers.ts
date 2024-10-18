import { useQuery } from '@tanstack/react-query';
import axiosInstance from '~/api/axios';

const fetchUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const useUsers = () => {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};
