import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
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
import DayOfWeekInput from './DayOfWeekInput/DayOfWeekInput';
import ScheduleForm from './ScheduleForm/ScheduleForm';
interface Props {
  header: string;
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
  _id: string;
  active: boolean;
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
  const [schedules, setSchedules] = useState<schedule[]>([]);
  const [schedule, setSchedule] = useState<schedule>();
  const [showActive, setShowActive] = useState(false);
  const [newSchedule, setNewSchedule] = useState(false);
  const [newScheduleCreated, setNewScheduleCreated] = useState(false);
  const [newScheduleId, setNewScheduleId] = useState<string>('');

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
    const id = typeof scheduleId === 'object' ? scheduleId._id : scheduleId;
    makeActiveSchedule(id).then((res) => {
      setShowActive(true);
    });
    updateSnackBarMessage('Schedule is now active!');
  };

  const handleNewSchedule = () => {
    if (schedule) {
      setSchedule(undefined);
    }
    setNewSchedule(true);
    setShowActive(false);
  };

  const handleNewSubmit = (e: any) => {
    const sanitizedSchedule = sanitizeTimes(e);
    createSchedule(sanitizedSchedule).then((res) => {
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

  const handleScheduleClick = (e: any, index: number) => {
    setSchedule(schedules[index]);
    setShowActive(false);
  };

  //will use, need to have a function on formik onSubmit or errors out
  const handleEditSchedule = (e: any) => {
    console.log(e);
  };

  const initialDayProps = {
    active: initialDayValues.active,
    startTime: initialDayValues.startTime,
    endTime: initialDayValues.endTime,
  };
  console.log(initialDayProps);
  console.log(initialDayValues);
  return (
    <div>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        height="100%"
      >
        <SettingHeader header={header} />
        <Box className={classes.container} display="flex" flexDirection="row" justifyContent="flex-start">
          <FormControl className={classes.select}>
            <InputLabel id="scheduleName">Schedules</InputLabel>
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
            onClick={handleNewSchedule}
            sx={{ color: 'white', backgroundColor: '#f14140', marginLeft: 2.5 }}
            className={classes.addSchedule}
          >
            + New Schedule
          </Button>
        </Box>
        {schedule && (
          <ScheduleForm
            schedule={schedule}
            handleEditSchedule={handleEditSchedule}
            showActive={showActive}
            handleMakeActiveSchedule={handleMakeActiveSchedule}
          ></ScheduleForm>
        )}
        {newSchedule && !schedule && (
          <>
            <Formik
              initialValues={{
                name: '',
                monday: initialDayProps,
                tuesday: initialDayProps,
                wednesday: initialDayProps,
                thursday: initialDayProps,
                friday: initialDayProps,
                saturday: initialDayProps,
                sunday: initialDayProps,
              }}
              onSubmit={handleNewSubmit}
            >
              {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="row" alignItems="center" height="100%">
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
                    {showActive && <StarIcon></StarIcon>}
                  </Box>
                  {daysOfTheWeek.map((day) => {
                    return (
                      <DayOfWeekInput
                        values={values}
                        setFieldValue={setFieldValue}
                        key={day}
                        day={day}
                        disabled={false}
                      ></DayOfWeekInput>
                    );
                  })}
                  <Box display="flex" flexDirection="row" justifyContent="center" height="100%">
                    {!newScheduleCreated && (
                      <Button type="submit" className={classes.saveButton}>
                        Save Schedule
                      </Button>
                    )}
                    {newScheduleCreated && !showActive && (
                      <Button onClick={() => handleMakeActiveSchedule(newScheduleId)}>
                        Make Active<StarIcon></StarIcon>
                      </Button>
                    )}
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
