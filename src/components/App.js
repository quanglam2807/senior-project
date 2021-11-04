import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";

import Button from '@mui/material/Button';

import SignIn from './SignIn';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  // docs: https://github.com/firebase/firebaseui-web-react
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged((user) => {
      if (!user) {
        setUserInfo(null);
        return;
      }
      setUserInfo({
        email: user.email,
        displayName: user.displayName,
      })
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  });

  return (
    <div className="App" style={{ padding: 20 }}>
      {userInfo ? (
        <>
          <p>{`Hi ${userInfo.displayName}`}</p>
          <Button
            variant="contained"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            Log out
          </Button>
        </>
      ) : <SignIn />}
    </div>
  );
}

export default App;
