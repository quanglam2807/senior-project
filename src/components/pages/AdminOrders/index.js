import React from 'react';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';

const AdminOrders = () => (
  <Box sx={{ flex: 1, p: 4 }}>
    <Helmet>
      <title>Orders</title>
    </Helmet>
    Orders will show up here.
  </Box>
);

export default AdminOrders;
