import React from 'react';
import List from '@mui/material/List';
import { UserType } from '../types';
import { useUsers } from '../hooks';
import User from './User';

const UserList: React.FC = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <List>
      {data?.map((user: UserType) => (
        <User key={user.id} user={user} />
      ))}
    </List>
  );
};

export default UserList;
