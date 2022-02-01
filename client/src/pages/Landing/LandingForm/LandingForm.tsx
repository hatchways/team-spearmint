import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import FormInput from '../../../components/FormInput/FormInput';
import FormInputRight from '../../../components/FormInput/FormInputRight';
import FormInputLeft from '../../../components/FormInput/FormInputLeft';

interface Props {
  handleSubmit: (
    {
      location,
      start,
      end,
    }: {
      location: string;
      start: string;
      end: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      location: string;
      start: string;
      end: string;
    }>,
  ) => void;
}

export default function LandingForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        location: '',
        start: '',
        end: '',
      }}
      validationSchema={Yup.object().shape({
        location: Yup.string().required('Location is required'),
        start: Yup.string().required('Drop In  is required'),
        end: Yup.string().required('Drop Off  is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormInput
            id="location"
            label="Where"
            fullWidth
            margin="normal"
            name="location"
            placeholder="Anywhere"
            autoFocus
            helperText={touched.location ? errors.location : ''}
            error={touched.location && Boolean(errors.location)}
            value={values.location}
            onChange={handleChange}
          />
          <Box style={{ display: 'flex' }}>
            <FormInputLeft
              id="start"
              label="Drop in / Drop off"
              fullWidth
              margin="normal"
              type="text"
              name="start"
              placeholder="mm/dd/yyy"
              helperText={touched.start ? errors.start : ''}
              error={touched.start && Boolean(errors.start)}
              value={values.start}
              onChange={handleChange}
            />
            <FormInputRight
              id="end"
              label=""
              fullWidth
              margin="normal"
              type="text"
              name="end"
              placeholder="mm/dd/yyy"
              helperText={touched.end ? errors.end : ''}
              error={touched.end && Boolean(errors.end)}
              value={values.end}
              onChange={handleChange}
            />
          </Box>

          <Box marginTop={5}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Find my dog sitter'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
