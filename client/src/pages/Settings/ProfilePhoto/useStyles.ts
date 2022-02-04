import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  profilePhoto: {
    height: 200,
    width: 200,
    borderRadius: '50%',
  },
  picText: {
    width: '40%',
    fontSize: 14,
    textAlign: 'center',
    color: 'lightgray',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 250,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    backgroundColor: 'white !important',
    fontWeight: 'bold',
    color: '#f14140 !important',
    border: 'solid 2px #f14140 !important',
  },
  deleteText: {
    marginTop: '15px !important',
    cursor: 'pointer',
  },
  uploadInput: {
    display: 'none',
  },
}));

export default useStyles;
