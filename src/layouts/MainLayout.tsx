import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '~/components';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar
        navItems={[
          { text: 'Home', path: '/' },
          { text: 'About', path: '/about' },
          { text: 'Contact', path: '/contact' },
        ]}
      />
      <Outlet />
    </>
  );
};

export default MainLayout;
