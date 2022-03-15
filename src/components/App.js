import React, { useEffect, useState, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';

import LayoutUser from './layouts/LayoutUser';
import LayoutAdmin from './layouts/LayoutAdmin';
import Login from './pages/Login';
import UserMenu from './pages/UserMenu';
import UserCheckout from './pages/UserCheckout';
import UserOrders from './pages/UserOrders';
import AdminMenu from './pages/AdminMenu';
import AdminOrders from './pages/AdminOrders';

const App = () => {
  const [initializing, setInitializing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAuth().currentUser));

  // docs: https://github.com/firebase/firebaseui-web-react
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged((user) => {
      setInitializing(true);
      if (!user) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  if (!initializing) {
    return (<div />);
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet
        titleTemplate="%s | Marty's"
      />
      <CssBaseline />
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<LayoutUser />}>
            <Route path="" element={<UserMenu />} />
            <Route path="/user/checkout" element={<UserCheckout />} />
            <Route path="/user/orders" element={<UserOrders />} />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="" element={<AdminOrders />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
          </Route>
        </Routes>
      ) : (<Login />)}
    </ThemeProvider>
  );
};

export default App;
