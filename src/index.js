import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store, persistor } from './reducers';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './firebase-app';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
