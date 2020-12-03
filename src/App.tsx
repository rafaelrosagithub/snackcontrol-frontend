import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import AppProvider from './context';
import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <ReactNotification />
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
