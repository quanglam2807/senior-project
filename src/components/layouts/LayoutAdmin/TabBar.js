/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useNavigate, useLocation } from 'react-router-dom';

export default function FullWidthTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box>
        <AppBar position="static">
          <Tabs
            value={location.pathname.startsWith('/admin/menu') ? 'menu' : 'orders'}
            onChange={(_, value) => {
              if (value === 'orders') {
                navigate('/admin');
                return;
              }
              navigate('/admin/menu');
            }}
            indicatorColor="secondary"
            textColor="inherit"
            centered
          >
            <Tab value="orders" label="Orders" />
            <Tab value="menu" label="Menu" />
          </Tabs>
        </AppBar>
      </Box>
    </>
  );
}
