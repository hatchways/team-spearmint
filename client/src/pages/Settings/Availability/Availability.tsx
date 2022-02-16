import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
// import TimePicker from 'react-ts-timepicker';
import { SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import FormInput from '../../../components/FormInput/FormInput';
import { useSnackBar } from '../../../context/useSnackbarContext';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  header: string;
}

interface DayOfWeekInputProps {
  day: string;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export default function Availability({ header }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const [newSchedule, setNewSchedule] = useState(false);

  const handleNewSchedule = () => {
    setNewSchedule(true);
  };

  const handleSubmit = () => {
    //
  };

  const initialDayValues = {
    active: false,
    startTime: '00:00',
    endTime: '00:00',
  };

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
  const [selectedStartTime, setSelectedStartTime] = useState(times[0]);
  const [selectedEndTime, setSelectedEndTime] = useState(times[0]);
  console.log(selectedStartTime);
  console.log(selectedEndTime);

  function DayOfWeekInput({ day, values, setFieldValue }: DayOfWeekInputProps) {
    console.log(values);
    const handleCheckBox = (e: any) => {
      setFieldValue(`${day}.active`, e.target.checked);
    };
    const handleStartTime = (e: any) => {
      if (parseInt(selectedEndTime) !== 0 && !validateTimes(e.currentTarget.id, selectedEndTime)) {
        updateSnackBarMessage('Start time must be before the end time!');
      } else {
        setSelectedStartTime(e.currentTarget.id);
        setFieldValue(`${day}.startTime`, e.currentTarget.id);
      }
    };
    const handleEndTime = (e: any) => {
      if (validateTimes(selectedStartTime, e.currentTarget.id)) {
        setSelectedEndTime(e.currentTarget.id);
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
            value={selectedStartTime}
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
            value={selectedEndTime}
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
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopTimePicker
            className={classes.timePicker}
            label="end Time"
            value={values[day].startTime}
            onChange={(e) => handleStartTime(e)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopTimePicker
            // className={classes.timePicker}
            label="End Time"
            value={values[day].endTime}
            onChange={(e) => handleEndTime(e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
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
        <Box
          className={classes.container}
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          // alignItems="center"
          // height="100%"
        >
          <FormControl className={classes.select}>
            <InputLabel id="scheduleName">Select</InputLabel>
            <Select id="scheduleName" name="schedule"></Select>
          </FormControl>
          <Button
            onClick={() => handleNewSchedule()}
            sx={{ borderRadius: '10%', color: 'green', border: 'solid 2px green' }}
            className={classes.addSchedule}
          >
            Add Schedule +
          </Button>
        </Box>
        {newSchedule && (
          <>
            <Formik
              initialValues={{
                name: '',
                monday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                tuesday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                wednesday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                thursday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                friday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                saturday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
                sunday: {
                  active: initialDayValues.active,
                  startTime: initialDayValues.startTime,
                  endTime: initialDayValues.endTime,
                },
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <FormInput
                    className={classes.scheduleNameInput}
                    id="scheduleSelect"
                    label="New Schedule"
                    margin="dense"
                    name="name"
                    placeholder="Schedule name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                  />
                  {daysOfTheWeek.map((day) => {
                    return (
                      <DayOfWeekInput
                        values={values}
                        setFieldValue={setFieldValue}
                        key={day}
                        day={day}
                      ></DayOfWeekInput>
                    );
                  })}
                </form>
              )}
            </Formik>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              // alignItems="center"
              height="100%"
            >
              <Button className={classes.saveButton}>
                Save Schedule <StarIcon></StarIcon>
              </Button>
              <Button>
                Delete Schedule <DeleteIcon></DeleteIcon>
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
