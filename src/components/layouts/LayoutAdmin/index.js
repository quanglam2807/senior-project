import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';

import TabBar from './TabBar';

const LayoutUser = () => (
  <>
    <CssBaseline />
    <TabBar />
    <Outlet />
  </>
);

export default LayoutUser;
