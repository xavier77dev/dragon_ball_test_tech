import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const getUser = localStorage.getItem('token');

  if (!isAuthenticated && !getUser) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
