import { useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Box, Grid, Typography, Paper, Card } from '@mui/material';
import useStyles from './useStyles';
import dogPicture from '../../images/landing/hero.jpg';
import RequestInfo from '../../components/RequestInfo/RequestInfo';
import MyCalendar from '../../components/MyCalendar/MyCalendar';

const dummyData = [
  {
    requestId: '111',
    date: '5 April 2020, 10-12 AM',
    avatar: 'https://groomersgallery.com/wp-content/uploads/2017/10/top-profile-example-1.jpg',
    name: 'Norma Byers',
    status: 'Accepted',
  },
  {
    requestId: '222',
    date: '5 April 2020, 10-12 AM',
    avatar: 'https://groomersgallery.com/wp-content/uploads/2017/10/top-profile-example-1.jpg',
    name: 'Norma Byers',
    status: 'Accepted',
  },
  {
    requestId: '333',
    date: '5 April 2020, 10-12 AM',
    avatar: 'https://groomersgallery.com/wp-content/uploads/2017/10/top-profile-example-1.jpg',
    name: 'Norma Byers',
    status: 'Accepted',
  },
];

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const [dateValue, setDateValue] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 20));

  return (
    <PageContainer>
      <Grid sx={{ width: '87%', margin: '0 auto' }} spacing={2} container>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} className={classes.leftContainer}>
          <Box className={classes.leftWrapper}>
            <Paper className={classes.cardWrapper}>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Your Next booking:
                </Typography>
                <RequestInfo key="123" dummyData={dummyData[0]} size="large" />
              </Box>
            </Paper>
            <Paper className={classes.cardWrapper}>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Current bookings:
                </Typography>
              </Box>
              <Box className={classes.scrollArea}>
                <Box className={classes.requests}>
                  {dummyData.map((request) => (
                    <RequestInfo key={request.requestId} dummyData={request} />
                  ))}
                </Box>

                <Box className={classes.bookingContent}>
                  <Typography className={classes.title} variant="caption" gutterBottom>
                    Past bookings:
                  </Typography>
                </Box>
                <Box className={classes.requests}>
                  {dummyData.map((request) => (
                    <RequestInfo key={request.requestId} dummyData={request} />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} className={classes.rightContainer}>
          <Box className={classes.rightWrapper}>
            <Paper className={classes.cardWrapper}>
              <Box className={classes.calendarContainer}>
                <MyCalendar />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
