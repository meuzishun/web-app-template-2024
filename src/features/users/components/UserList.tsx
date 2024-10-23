import React from 'react';
import { User as UserType } from '../types';
import { useUsers } from '../hooks';
import User from './User';

const UserList: React.FC = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <ul>
      {data?.map((user: UserType) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;
