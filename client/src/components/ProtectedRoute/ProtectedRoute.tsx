import { Route, RouteProps, Redirect } from 'react-router-dom';
import { User } from '../../interface/User';

interface Props extends RouteProps {
  loggedInUser: User | null | undefined;
}

const ProtectedRoute = ({ loggedInUser, ...routeProps }: Props) => {
  if (loggedInUser) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
