import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import FormInput from '../../../../components/FormInput/FormInput';
import DayOfWeekInput from '../DayOfWeekInput/DayOfWeekInput';
import useStyles from './useStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

interface Day {
  active: boolean;
  startTime: number;
  endTime: number;
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

interface Props {
  schedule: schedule;
  handleEditSchedule: (e: any) => void;
  showActive: boolean;
  handleMakeActiveSchedule: (scheduleId: any) => void;
}
export default function ScheduleForm({ schedule, handleEditSchedule, showActive, handleMakeActiveSchedule }: Props) {
  const classes = useStyles();
  return (
    <>
      <Formik enableReinitialize initialValues={schedule} onSubmit={handleEditSchedule}>
        {({ values, setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
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
            {showActive && <StarIcon />}
            {daysOfTheWeek.map((day) => {
              return (
                <DayOfWeekInput values={values} setFieldValue={setFieldValue} key={day} day={day}></DayOfWeekInput>
              );
            })}
            <Box display="flex" flexDirection="row" justifyContent="center" height="100%">
              <Button onClick={() => handleMakeActiveSchedule(values)}>
                Make Active <StarIcon />
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
