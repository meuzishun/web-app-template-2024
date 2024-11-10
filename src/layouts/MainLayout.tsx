import React from 'react';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, Outlet } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Contact', path: '/contact' },
];

const MainLayout: React.FC = () => {
  return (
    <>
      <AppBar position='static' component='nav'>
        <Stack
          direction='row'
          sx={{ justifyContent: 'space-between', alignItems: 'center', mx: 4 }}
        >
          <Typography variant='h4'>Web App Template</Typography>
          <List sx={{ display: 'inline-flex' }}>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{ textAlign: 'center' }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </AppBar>
      <Outlet />
    </>
  );
};

export default MainLayout;
