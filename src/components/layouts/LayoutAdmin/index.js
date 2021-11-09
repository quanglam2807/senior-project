import React from 'react';
import { Outlet } from 'react-router-dom';

import TabBar from './TabBar';

const LayoutUser = () => (
  <>
    <TabBar />
    <Outlet />
  </>
);

export default LayoutUser;
