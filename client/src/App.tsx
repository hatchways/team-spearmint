import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { SitterSearchProvider } from './context/useSitterSearchContext';

import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import ManageBookings from './pages/ManageBookings/ManageBookings';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import Profiles from './pages/Profiles/Profiles';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ManageBookings from './pages/ManageBookings/ManageBookings';


function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <SitterSearchProvider>
                <CssBaseline />
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route path="/profile/settings" component={Settings} />
                  <Route exact path="/manage-bookings" component={ManageBookings} />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </SitterSearchProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
