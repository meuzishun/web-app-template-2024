import { axiosInstance } from '~/api';
import type { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const createUser = async (newUser: Omit<User, 'id'>) => {
  const response = await axiosInstance.post('/users', newUser);
  return response.data;
};

export const updateUser = async (updatedUser: User) => {
  const response = await axiosInstance.put(
    `/users/${updatedUser.id}`,
    updatedUser
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`/users/${id}`);
};
