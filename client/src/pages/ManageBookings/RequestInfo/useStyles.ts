import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusButton: {
    cursor: 'pointer',
  },
  status: {
    textTransform: 'uppercase',
    color: 'rgba(200, 200, 200, 0.9)',
    padding: '3px 7px',
    borderRadius: '5px',
    '&:hover': {
      color: 'rgba(150, 150, 150, 0.9)',
      fontSize: '11px',
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
    },
  },
  settingsIcon: {
    marginTop: -50,
    marginRight: -5,
  },
  settingsIconLarge: {
    marginTop: -140,
    marginRight: 10,
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    border: 'none',
    borderRadius: 6,
    background: '#fff',
    padding: 40,
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

export default useStyles;
