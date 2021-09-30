import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './firebase-app';

const SignIn = () => {

  return (
    <>
      <p>Please sign-in:</p>
      <button
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
      </button>
    </>
  );
}

export default SignIn;
