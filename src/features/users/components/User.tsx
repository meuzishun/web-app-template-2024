import React from 'react';
import type { UserType } from '../types';

interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <li>
      {user.name} - {user.email}
    </li>
  );
};

export default User;
