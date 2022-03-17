import React from 'react';
import { Box, InputLabel, CircularProgress, Button, Grid } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import { MyDatePicker } from '../MyDatePicker/MyDatePicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  handleSubmit: (
    {
      start,
      end,
    }: {
      start: Date;
      end: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      start: Date;
      end: Date;
    }>,
  ) => void;
}

export default function RequestForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  const initialValues: any = {
    start: '',
    end: '',
  };

  const validationSchema: any = Yup.object({
    start: Yup.date().required('Required'),
    end: Yup.date().required('Required'),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <Grid container justifyContent="center" rowSpacing={3}>
            <Grid item xs={12}>
              <MyDatePicker id="start" name="start" label="Drop In" />
            </Grid>
            <Grid item xs={12}>
              <MyDatePicker id="end" name="end" label="Drop Off" />
            </Grid>
            <Grid item mt={2}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
                disableElevation
              >
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Request'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
