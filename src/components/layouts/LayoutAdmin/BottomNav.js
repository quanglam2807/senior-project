/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Paper
        sx={{ zIndex: 100 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={location.pathname.startsWith('/admin/menu') ? 'menu' : 'orders'}
          onChange={(_, value) => {
            if (value === 'orders') {
              navigate('/admin');
              return;
            }
            navigate('/admin/menu');
          }}
        >
          <BottomNavigationAction label="Orders" value="orders" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Menu" value="menu" icon={<MenuBookIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
