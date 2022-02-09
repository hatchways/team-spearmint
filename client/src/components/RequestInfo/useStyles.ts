import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    margin: '0 auto',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  requestInfo: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(227, 227, 227, 0.9)',
    borderRadius: 5,
    marginTop: 0,
    padding: 15,
  },
  requestInfoLarge: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    marginTop: 10,
    padding: 0,
  },
  nameAvatar: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 12,
  },
  statusAndIcon: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  status: {
    textTransform: 'uppercase',
    color: 'rgba(200, 200, 200, 0.9)',
  },
  settingsIcon: {
    marginTop: -30,
    marginRight: -5,
  },
  settingsIconLarge: {
    marginTop: -80,
    marginRight: 10,
  },
}));

export default useStyles;
