import { useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Box, Grid, Typography, Paper, Card } from '@mui/material';
import useStyles from './useStyles';
import RequestInfo from '../../components/RequestInfo/RequestInfo';
import MyCalendar from '../../components/MyCalendar/MyCalendar';

const dummyData = [
  {
    requestId: '111',
    date: '5 April 2020, 10-12 AM',
    avatar:
      'https://media.istockphoto.com/photos/enjoying-being-a-dog-owner-picture-id1202541194?b=1&k=20&m=1202541194&s=170667a&w=0&h=arj673-gVbb0q8BBdEo3enTNKcJDpHSXFyQdKSRYMLU=',
    name: 'Norma Byers',
    status: 'accepted',
  },
  {
    requestId: '222',
    date: '8 April 2020, 7-9 AM',
    avatar: 'https://st.depositphotos.com/1146092/3435/i/600/depositphotos_34357621-stock-photo-dog-woner-with-dog.jpg',
    name: 'Charles Compton',
    status: 'pending',
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
                <RequestInfo dummyData={dummyData[0]} large={true} />
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
