import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Register } from './pages/Register';
import { Detail } from './pages/Detail';
import { CreateCharacter } from './pages/CreateCharacter';
import { EditCharacter } from './pages/EditCharacter';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <PrivateRoute>
            <Detail />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-character"
        element={
          <PrivateRoute>
            <CreateCharacter />
          </PrivateRoute>
        }
      />


      <Route
        path="/edit-character/:id"
        element={
          <PrivateRoute>
            <EditCharacter />
          </PrivateRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route path="*" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
