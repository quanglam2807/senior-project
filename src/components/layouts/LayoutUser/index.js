import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import AppBar from '../../shared/AppBar';

const LayoutUser = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    <AppBar />
    <Outlet />
  </Box>
);

export default LayoutUser;
