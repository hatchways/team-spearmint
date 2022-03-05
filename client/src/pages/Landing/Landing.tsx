import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import LandingPageHeader from '../../components/LandingPageHeader/LandingPageHeader';
import LandingForm from './LandingForm/LandingForm';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';
import { useSitterSearch } from '../../context/useSitterSearchContext';
import { useHistory } from 'react-router';

export default function Landing(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const { updateSitterSearchInfo } = useSitterSearch();

  const handleSubmit = (
    { location, start, end }: { location: string; start: Date; end: Date },
    { setSubmitting }: FormikHelpers<{ location: string; start: Date; end: Date }>,
  ) => {
    alert(`location: ${location} - start: ${start} - end: ${end}`);
    updateSitterSearchInfo(location, start, end);
    history.push('/profiles');
  };

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} md={6} order={{ xs: 2, md: 1 }} className={classes.form} item>
        <Box mt={4}>
          <LandingPageHeader header="Find the care your dog deserves"></LandingPageHeader>
          <LandingForm handleSubmit={handleSubmit} />
        </Box>
      </Grid>
      <Grid xs={12} md={6} order={{ xs: 1, md: 2 }} className={classes.image} item></Grid>
    </Grid>
  );
}
