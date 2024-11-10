import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import type { UserType } from '../types';

interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <ListItem>
      <Typography variant='body1'>
        {user.name} -{' '}
        <Link
          underline='hover'
          href={`mailto:${user.email}`}
          sx={{ cursor: 'pointer' }}
        >
          {user.email}
        </Link>
      </Typography>
    </ListItem>
  );
};

export default User;
