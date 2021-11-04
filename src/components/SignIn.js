import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Button from '@mui/material/Button';

import '../firebase-app';

const SignIn = () => (
  <>
    <p>Please sign-in:</p>
    <Button
      variant="contained"
      onClick={() => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .catch((error) => {
            // eslint-disable-next-line no-alert
            window.alert(error.message);
          });
      }}
    >
      Sign in with Google
    </Button>
  </>
);

export default SignIn;
