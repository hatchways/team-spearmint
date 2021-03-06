import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
    marginBottom: 20,
    // margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 300,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    // backgroundColor: 'white !important',
    fontWeight: 'bold',
    // color: '#f14140 !important',
    // border: 'solid 2px #f14140 !important',
  },
  deleteText: {
    // marginTop: '15px !important',
    cursor: 'pointer',
  },
  uploadInput: {
    display: 'none',
  },
  upload: {
    display: 'none',
  },
}));

export default useStyles;
