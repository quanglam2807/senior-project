import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from '@mui/material/Button';

import '../firebase-app';

const SignIn = () => {
  return (
    <>
      <p>Please sign-in:</p>
      <Button
        variant="contained"
        onClick={() => {
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .catch((error) => {
              alert(error.message);
            });
        }}
      >
        Sign in with Google
      </Button>
    </>
  );
}

export default SignIn;
