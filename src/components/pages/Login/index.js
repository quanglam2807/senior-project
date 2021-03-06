import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { Helmet } from 'react-helmet';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Login = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          signInWithRedirect(auth, provider)
            .catch((error) => {
              // eslint-disable-next-line no-alert
              window.alert(error.message);
            });
        }}
      >
        Sign in with Luther account
      </Button>
    </Box>
  </Box>
);

export default Login;
