import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import TabBar from './TabBar';

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

  if (!isAdmin) return 'Access denied';

  return (
    <>
      <TabBar />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
