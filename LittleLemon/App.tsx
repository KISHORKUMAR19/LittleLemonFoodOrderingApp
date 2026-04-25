import React from 'react';
import Fontloader from './components/FondLoader';
import AppNavigator from './Navigation/AppNavigation';
import { AuthProvider } from './context/AuthContext'; 

export default function App() {
  return (
    <AuthProvider>
      <Fontloader>
        <AppNavigator/>
      </Fontloader>
    </AuthProvider>
  );
}


