import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import { Toaster } from 'sonner';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Toaster />
      <CssBaseline />
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
