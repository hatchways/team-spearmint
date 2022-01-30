import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAuth } from './context/useAuthContext';

function App(): JSX.Element {
  const { loggedInUser } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <CssBaseline />
              <Navbar />
              <Switch>
                <ProtectedRoute loggedInUser={loggedInUser} exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute loggedInUser={loggedInUser} exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute loggedInUser={loggedInUser} path="/profile/settings" component={Settings} />
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
