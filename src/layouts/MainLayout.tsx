import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '~/components';

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
