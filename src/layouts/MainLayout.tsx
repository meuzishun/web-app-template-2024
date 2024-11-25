import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '~/components';
import { navItems } from '~/data';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar heading='Web App Template' navItems={navItems} />
      <Outlet />
    </>
  );
};

export default MainLayout;
