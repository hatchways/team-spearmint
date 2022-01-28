import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import LandingPageHeader from '../../components/LandingPageHeader/LandingPageHeader';
import LandingForm from './LandingForm/LandingForm';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';

export default function Landing(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    { location, start, end }: { location: string; start: string; end: string },
    { setSubmitting }: FormikHelpers<{ location: string; start: string; end: string }>,
  ) => {
    alert(`location: ${location} - start: ${start} - end: ${end}`);
  };

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} md={6} className={classes.form} item>
        <Box>
          <LandingPageHeader header="Find the care your dog deserves"></LandingPageHeader>
          <LandingForm handleSubmit={handleSubmit} />
        </Box>
      </Grid>
      <Grid xs={12} md={6} className={classes.image} item></Grid>
    </Grid>
  );
}
