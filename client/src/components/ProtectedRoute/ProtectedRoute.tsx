import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
