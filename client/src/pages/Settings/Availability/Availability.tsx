import { Box, Button, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
// import TimePicker from 'react-ts-timepicker';
import { SetStateAction, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  header: string;
}

interface DayOfWeekInputProps {
  day: string;
}

export default function Availability({ header }: Props): JSX.Element {
  const classes = useStyles();
  const daysOfTheWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN '];
  function DayOfWeekInput({ day }: DayOfWeekInputProps) {
    const [startTime, setStartTime] = useState<SetStateAction<Date> | null>(new Date('2018-01-01T00:00:00.000Z'));
    const [endTime, setEndTime] = useState<SetStateAction<Date> | null>(new Date('2018-01-01T00:00:00.000Z'));

    return (
      <Box
        className={classes.timeContainer}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <input type="checkbox"></input>
        <p className={classes.dayText}>{day}</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopTimePicker
            className={classes.timePicker}
            label="Start Time"
            value={startTime}
            onChange={(newStartTime) => {
              setStartTime(newStartTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopTimePicker
            // className={classes.timePicker}
            label="End Time"
            value={endTime}
            onChange={(newEndTime) => {
              setEndTime(newEndTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    );
  }

  return (
    <div>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        // alignItems="center"
        height="100%"
      >
        <SettingHeader header={header} />
        {daysOfTheWeek.map((day) => {
          return <DayOfWeekInput key={day} day={day}></DayOfWeekInput>;
        })}
        <Box
          className={classes.container}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          // alignItems="center"
          height="100%"
        >
          <Button className={classes.saveButton}>Save Schedule</Button>
          <Button>
            Delete Schedule <DeleteIcon></DeleteIcon>
          </Button>
        </Box>
      </Box>
    </div>
  );
}
