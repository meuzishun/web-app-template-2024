import React from 'react';
import List from '@mui/material/List';
import { UserType } from '../types';
import { useUsers } from '../hooks';
import User from './User';
import { LoadingIndicator, ErrorComponent } from '~/components';

const UserList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorComponent />;

  return (
    <List>
      {users?.map((user: UserType) => (
        <User key={user.id} user={user} />
      ))}
    </List>
  );
};

export default UserList;
