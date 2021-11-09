import React from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from './AppBar';

const LayoutUser = () => (
  <>
    <AppBar />
    <Outlet />
  </>
);

export default LayoutUser;
