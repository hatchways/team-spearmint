import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  timePicker: {
    marginRight: '20px !important',
  },
  dayText: {
    marginRight: 20,
    width: 20,
  },
  container: {
    // backgroundColor: 'red',
  },
  timeContainer: {
    marginBottom: 20,
    marginLeft: 35,
  },
  saveButton: {
    backgroundColor: 'red',
  },
}));

export default useStyles;
