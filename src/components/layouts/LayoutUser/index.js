import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';

import AppBar from './AppBar';

const LayoutUser = () => (
  <>
    <CssBaseline />
    <AppBar />
    <Outlet />
  </>
);

export default LayoutUser;
