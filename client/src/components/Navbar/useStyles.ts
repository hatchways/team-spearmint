import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    background: 'white',
    padding: '30px 50px',
  },
  transparentNavbar: {
    boxShadow: 'none',
    background: 'none',
    position: 'absolute',
    zIndex: 2,
  },
  navbarItem: {
    color: theme.palette.grey[900],
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  navbarLogo: {
    width: 180,
  },
}));
