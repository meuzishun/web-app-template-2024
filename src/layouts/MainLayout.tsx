import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '~/components';
import { navItems } from '~/data';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar navItems={navItems} />
      <Outlet />
    </>
  );
};

export default MainLayout;
