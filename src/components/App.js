import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import LayoutUser from './layouts/LayoutUser';
import LayoutAdmin from './layouts/LayoutAdmin';
import Login from './pages/Login';
import UserMenu from './pages/UserMenu';
import UserCheckout from './pages/UserCheckout';
import AdminMenu from './pages/AdminMenu';

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

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  if (!initializing) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<LayoutUser />}>
            <Route path="" element={<UserMenu />} />
            <Route path="/user/checkout" element={<UserCheckout />} />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="" element={<AdminMenu />} />
          </Route>
        </Routes>
      ) : (<Login />)}
    </ThemeProvider>
  );
};

export default App;
