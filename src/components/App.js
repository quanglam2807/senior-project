import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
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
import UserMenu from './pages/UserMenu';
import AdminMenu from './pages/AdminMenu';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAuth().currentUser));

  // docs: https://github.com/firebase/firebaseui-web-react
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
          .catch((error) => {
            // eslint-disable-next-line no-alert
            window.alert(error.message);
          });
        return;
      }
      setIsLoggedIn(true);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  if (!isLoggedIn) {
    return null;
  }

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<LayoutUser />}>
          <Route path="" element={<UserMenu />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="" element={<AdminMenu />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
