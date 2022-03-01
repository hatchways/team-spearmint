import { Box, Button, Grid, CircularProgress, InputLabel } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import FormInput from '../../../components/FormInput/FormInput';
import { DatePickerField } from '../../../components/FormInput/DatePicker/DatePickerField';

interface Props {
  handleSubmit: (
    {
      location,
      start,
      end,
    }: {
      location: string;
      start: Date;
      end: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      location: string;
      start: Date;
      end: Date;
    }>,
  ) => void;
}

export default function LandingForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();
  const initialValues: any = {
    location: '',
    start: '',
    end: '',
  };
  const validationSchema: any = Yup.object({
    location: Yup.string().required('Required'),
    start: Yup.date().required('Required'),
    end: Yup.date().required('Required'),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormInput
            id="location"
            label="Where"
            fullWidth
            margin="normal"
            name="location"
            placeholder="Anywhere"
            helperText={touched.location ? errors.location : ''}
            error={touched.location && Boolean(errors.location)}
            value={values.location}
            onChange={handleChange}
          />
          <InputLabel
            sx={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#000',
            }}
            shrink
            htmlFor="dates"
          >
            Drop In/ Drop off
          </InputLabel>
          <Grid container>
            <Grid item xs={6}>
              <DatePickerField id="dates" name="start" />
            </Grid>
            <Grid item xs={6}>
              <DatePickerField id="end-dates" name="end" />
            </Grid>
          </Grid>

          <Box mt={4} mb={4} sx={{ paddingLeft: '0px, 0px, 20px 0px' }}>
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
        </Form>
      )}
    </Formik>
  );
}
