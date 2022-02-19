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
import createSchedule from '../../../helpers/APICalls/createSchedule';
import getAllSchedules from '../../../helpers/APICalls/getAllSchedules';
import makeActiveSchedule from '../../../helpers/APICalls/makeActiveSchedule';

interface Props {
  header: string;
}

interface DayOfWeekInputProps {
  day: string;
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

interface Day {
  active: boolean;
  startTime: number;
  endTime: number;
}

interface Schedule {
  [day: string]: Day | string;
}

interface schedule {
  name: string;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
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

export default function Availability({ header }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<schedule>();
  const [showActive, setShowActive] = useState(false);

  console.log(schedules);

  useEffect(() => {
    const sanitizeSchedules = (schedules: any) => {
      schedules.forEach((schedule: any) => {
        daysOfTheWeek.forEach((day) => {
          const convertedStartTime = times[schedule[day].startTime / 60];
          const convertedEndTime = times[schedule[day].endTime / 60];
          schedule[day].startTime = convertedStartTime;
          schedule[day].endTime = convertedEndTime;
        });
      });
      return schedules;
    };

    const getSchedules = async () => {
      const allSchedules = await getAllSchedules();

      if (!allSchedules) {
        updateSnackBarMessage('Error loading schedules!');
      } else {
        setSchedules(sanitizeSchedules(allSchedules));
      }
    };
    getSchedules();
  }, [updateSnackBarMessage]);

  const handleMakeActiveSchedule = (scheduleId: any) => {
    // debugger;
    const id = typeof scheduleId === 'object' ? scheduleId._id : scheduleId;
    makeActiveSchedule(id).then((res) => {
      console.log(res);
      setShowActive(true);
    });
    updateSnackBarMessage('Schedule is now active!');
  };

  const handleEditSchedule = (e: any) => {
    const sanitizedSchedule = sanitizeTimes(e);
  };

  console.log(schedules);
  const [newSchedule, setNewSchedule] = useState(false);
  const [newScheduleCreated, setNewScheduleCreated] = useState(false);
  const [newScheduleId, setNewScheduleId] = useState<string>('');
  const handleNewSchedule = () => {
    setNewSchedule(true);
  };

  const handleNewSubmit = (e: any) => {
    console.log(e);
    const sanitizedSchedule = sanitizeTimes(e);
    createSchedule(sanitizedSchedule).then((res) => {
      console.log(res);
      setNewScheduleId(res._id);
    });
    updateSnackBarMessage('Your new schedule was created!');
    setNewScheduleCreated(true);
  };

  const sanitizeTimes = (schedule: any) => {
    const sanitizedSchedule = {} as Schedule;
    sanitizedSchedule['name'] = schedule.name;
    daysOfTheWeek.forEach((day) => {
      if (schedule[day].active) {
        const startTimeInMinutes = parseInt(schedule[day].startTime) * 60;
        const endTimeInMinutes = parseInt(schedule[day].endTime) * 60;

        sanitizedSchedule[day] = {
          active: true,
          startTime: startTimeInMinutes,
          endTime: endTimeInMinutes,
        };
      }
    });
    return sanitizedSchedule;
  };

  const initialDayValues = {
    active: false,
    startTime: '06:00',
    endTime: '21:00',
  };

  const [selectedStartTime, setSelectedStartTime] = useState(times[6]);
  const [selectedEndTime, setSelectedEndTime] = useState(times[21]);

  const handleScheduleClick = (e: any, index: number) => {
    setSchedule(schedules[index]);
  };

  console.log(selectedStartTime);
  console.log(selectedEndTime);
  console.log(schedule);
  function DayOfWeekInput({ day, values, setFieldValue }: DayOfWeekInputProps) {
    // console.log(values);
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
            <Select id="scheduleName" name="schedule">
              {schedules &&
                schedules.map((schedule, index) => {
                  return (
                    <MenuItem
                      onClick={(e) => {
                        handleScheduleClick(e, index);
                      }}
                      key={schedule._id}
                      id={schedule._id}
                      value={schedule._id}
                    >
                      {schedule.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button
            onClick={() => handleNewSchedule()}
            sx={{ borderRadius: '10%', color: 'green', border: 'solid 2px green' }}
            className={classes.addSchedule}
          >
            Add Schedule +
          </Button>
        </Box>
        {schedule && !newSchedule && (
          <>
            <Formik initialValues={schedule} onSubmit={handleEditSchedule}>
              {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <FormInput
                    className={classes.scheduleNameInput}
                    id="scheduleSelect"
                    label="Schedule"
                    margin="dense"
                    name="name"
                    placeholder="Schedule name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                  />
                  {showActive && <StarIcon></StarIcon>}
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
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    // alignItems="center"
                    height="100%"
                  >
                    <Button onClick={() => handleMakeActiveSchedule(values)}>
                      Make Active <StarIcon></StarIcon>
                    </Button>
                    <Button>
                      Delete Schedule <DeleteIcon></DeleteIcon>
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </>
        )}
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
              onSubmit={handleNewSubmit}
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
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    // alignItems="center"
                    height="100%"
                  >
                    <Button type="submit" className={classes.saveButton}>
                      Save Schedule
                    </Button>
                    {newScheduleCreated && (
                      <Button onClick={() => handleMakeActiveSchedule(newScheduleId)}>
                        Make Active Schedule<StarIcon></StarIcon>
                      </Button>
                    )}
                    <Button>
                      Delete Schedule <DeleteIcon></DeleteIcon>
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </div>
  );
}
