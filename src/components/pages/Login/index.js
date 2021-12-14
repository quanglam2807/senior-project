import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

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
    <div>
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
    </div>
  </Box>
);

export default Login;
