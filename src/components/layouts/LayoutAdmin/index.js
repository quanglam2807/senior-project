import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';

import AppBar from '../../shared/AppBar';
import BottomNav from './BottomNav';

const LayoutAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { currentUser } = getAuth();
      const docRef = doc(getFirestore(), 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setIsAdmin(data && data.role === 'admin');
    })();
  }, []);

  if (!isAdmin) {
    return (
      <Box sx={{ p: 2 }}>
        Access denied.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Helmet
        titleTemplate="%s | Marty's AdminCP"
      />
      <AppBar admin />
      <Outlet />
      <BottomNav />
    </Box>
  );
};

export default LayoutAdmin;
