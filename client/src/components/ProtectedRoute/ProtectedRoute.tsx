import { Route, RouteProps, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { loggedInUser, profile } = useAuth();
  const history = useHistory();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser || !profile) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  if (loggedInUser) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
