import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  timePicker: {
    marginRight: '20px !important',
  },
  dayText: {
    marginRight: 80,
    width: 20,
  },
  container: {
    marginBottom: 20,
  },
  timeContainer: {
    marginBottom: 20,
    width: '100%',
  },
  saveButton: {
    backgroundColor: 'red',
  },
  select: {
    width: '30%',
    marginRight: 20,
  },
  addSchedule: {
    height: 52,
    width: '30%',
  },
  scheduleNameInput: {
    width: '80%',
  },
  startTime: {
    marginRight: 10,
    width: '150px',
  },
  endTime: {
    width: '150px',
  },
}));

export default useStyles;
