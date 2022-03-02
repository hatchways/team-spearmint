import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  menuItemClasses,
  styled,
} from '@mui/material';
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import { useStyles } from './useStyles';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import loadProfile from '../../helpers/APICalls/loadProfile';
import { Profile } from '../../interface/Profile';
import { useSnackBar } from '../../context/useSnackbarContext';


const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateSnackBarMessage } = useSnackBar();

  const { loggedInUser, logout } = useAuth();

  const open = Boolean(anchorEl);

  const NavbarButton = styled(Button)({
    padding: '10px 0px',
  });

  const menuItems = [
    {
      item: 'Become a Sitter',
      resource: '/dashboard',
      canView: [AccountType.PET_OWNER],
      authenticated: true,
    },
    {
      item: 'Become a sitter',
      resource: '/signup?accountType=pet_sitter',
      canView: null,
      authenticated: false,
    },
    {
      item: 'My Jobs',
      resource: '/my-jobs',
      canView: [AccountType.PET_SITTER],
      authenticated: true,
    },
    {
      item: 'My Sitters',
      resource: '/sitters',
      canView: [AccountType.PET_OWNER],
      authenticated: true,
    },
    {
      item: 'Messages',
      resource: '/messages',
      canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
      authenticated: true,
    },
    {
      item: (
        <NavbarButton
          variant="outlined"
          size="large"
          fullWidth
          color={location.pathname === '/' ? 'secondary' : 'primary'}
        >
          Login
        </NavbarButton>
      ),
      resource: '/login',
      canView: null,
      authenticated: false,
    },
    {
      item: (
        <NavbarButton variant="contained" size="large" fullWidth disableElevation>
          Sign up
        </NavbarButton>
      ),
      resource: '/signup',
      canView: null,
      authenticated: false,
    },
  ];

  const MenuItem: React.FC<{
    resource: string;
    item: string | JSX.Element;
  }> = ({ resource, item }) => {
    const classes = useStyles();

    return (
      <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
        <NavLink
          className={location.pathname === '/' ? classes.transparentnavbarItem : classes.navbarItem}
          to={resource}
        >
          {item}
        </NavLink>
      </Grid>
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };
  const [profile, setProfile] = useState<Profile>();

  const renderMenuItems = () => {
    return menuItems.map((menu) => {
      if (menu.authenticated && menu.canView?.includes(profile?.accountType || '')) {
        return loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      } else {
        if (!menu.authenticated) {
          return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
        }
      }
    });
  };

  useEffect(() => {
    if (loggedInUser) {
      async function getProfile() {
        const loadedProfile = await loadProfile(loggedInUser?.id);

        if (!loadedProfile) {
          updateSnackBarMessage('Profile not found');
        } else {
          setProfile(loadedProfile);
        }
      }

      getProfile();
    }
  }, [loggedInUser, updateSnackBarMessage]);

  return (
    <Grid
      className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}
      justifyContent="space-between"
      alignItems="center"
      container
    >
      <Grid xs={4} md={6} item>
        <NavLink className={classes.navbarItem} to="/">
          <img className={classes.navbarLogo} src={lovingSitterLogo} alt="lovingsitter logo" />
        </NavLink>
      </Grid>
      <Grid xs={8} md={6} item>
        <Grid container alignItems="center" gap={2} justifyContent="flex-end">
          {profile && renderMenuItems()}
          {loggedInUser && (
            <Grid xs={2} item>
              <>
                <IconButton
                  size="large"
                  aria-label="account profile picture"
                  aria-controls="menu-navbar"
                  arais-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <img style={{ width: 50 }} src={`https://robohash.org/${loggedInUser.email}`} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </DropdownMenuItem>
                  <DropdownMenuItem component={NavLink} to="/dashboard" onClick={handleClose}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </DropdownMenuItem>
                  <Divider />
                  <DropdownMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </DropdownMenuItem>
                </Menu>
              </>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Navbar };
