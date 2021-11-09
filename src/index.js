import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LayoutUser from './components/layouts/LayoutUser';
import LayoutAdmin from './components/layouts/LayoutAdmin';
import UserMenu from './components/pages/UserMenu';
import AdminMenu from './components/pages/AdminMenu';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<LayoutUser />}>
          <Route path="" element={<UserMenu />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="" element={<AdminMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
