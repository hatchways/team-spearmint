import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
  nameAvatar: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 12,
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
