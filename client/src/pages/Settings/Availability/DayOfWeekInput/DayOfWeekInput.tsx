import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import FormInput from '../../../../components/FormInput/FormInput';
import { useSnackBar } from '../../../../context/useSnackbarContext';

interface DayOfWeekInputProps {
  day: string;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const times = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

export default function DayOfWeekInput({ day, values, setFieldValue }: DayOfWeekInputProps) {
  const { updateSnackBarMessage } = useSnackBar();
  console.log(values);

  const classes = useStyles();
  // console.log(values);
  const handleCheckBox = (e: any) => {
    setFieldValue(`${day}.active`, e.target.checked);
  };
  const handleStartTime = (e: any) => {
    if (parseInt(values[day].endTime) !== 0 && !validateTimes(e.currentTarget.id, values[day].endTime)) {
      updateSnackBarMessage('Start time must be before the end time!');
    } else {
      // setSelectedStartTime(e.currentTarget.id);
      setFieldValue(`${day}.startTime`, e.currentTarget.id);
    }
  };
  const handleEndTime = (e: any) => {
    if (validateTimes(values[day].startTime, e.currentTarget.id)) {
      // setSelectedEndTime(e.currentTarget.id);
      setFieldValue(`${day}.endTime`, e.currentTarget.id);
    } else {
      updateSnackBarMessage('End time must be after the start time!');
    }
  };

  const handleChange = (e: any) => {
    // debugger;
  };

  const validateTimes = (startTime: string, endTime: string) => {
    const start = parseInt(startTime);
    const end = parseInt(endTime);
    return start < end ? true : false;
  };

  const getDisabled = (val: any) => {
    if (val) return { disabled: true };
    return {};
  };

  return (
    <Box
      className={classes.timeContainer}
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <input onClick={(e) => handleCheckBox(e)} defaultChecked={values && values[day].active} type="checkbox"></input>
      <p className={classes.dayText}>{day}</p>
      <FormControl>
        <InputLabel id="startTimeLabel">Start Time</InputLabel>
        <Select
          className={classes.startTime}
          {...getDisabled(!values[day].active)}
          id="startTimeSelect"
          name="startTime"
          value={values[day].startTime}
          onChange={(e) => handleChange(e)}
        >
          {times.map((time) => {
            return (
              <MenuItem
                onClick={(e) => {
                  handleStartTime(e);
                }}
                key={time}
                id={time}
                value={time}
              >
                {time}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="endTimeLabel">End Time</InputLabel>
        <Select
          className={classes.endTime}
          {...getDisabled(!values[day].active)}
          id="endTimeSelect"
          name="endTime"
          value={values[day].endTime}
          onChange={(e) => handleChange(e)}
        >
          {times.map((time) => {
            return (
              <MenuItem
                onClick={(e) => {
                  handleEndTime(e);
                }}
                key={time}
                id={time}
                value={time}
              >
                {time}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
