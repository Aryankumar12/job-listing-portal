import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
