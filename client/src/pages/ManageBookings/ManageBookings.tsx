import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Box, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import useStyles from './useStyles';
import RequestInfo from '../../components/RequestInfo/RequestInfo';
import MyCalendar from '../../components/MyCalendar/MyCalendar';
import { useAuth } from '../../context/useAuthContext';
import getSitterRequests from '../../helpers/APICalls/sitterRequests';
import { RequestApiData } from '../../interface/RequestApiData';
import { format } from 'date-fns';
import changeStatus from '../../helpers/APICalls/changeStatus';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { sitterRequests } = useAuth();
  const { updateSitterRequestsContext } = useAuth();
  const [dateValue, setDateValue] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 20));

  const handleStatus = (requestId: string, newStatus: string): void => {
    changeStatus(requestId, newStatus).then((res) => {
      const index = sitterRequests.findIndex((request: RequestApiData) => {
        return request._id === requestId;
      });
      if (index !== -1) {
        const newSitterRequests = [...sitterRequests];
        newSitterRequests[index].status = res.status;
        updateSitterRequestsContext(newSitterRequests);
      }
    });
  };

  useEffect(() => {
    if (loggedInUser) {
      getSitterRequests(loggedInUser.id).then((res) => {
        console.log(res);
        updateSitterRequestsContext(res);
      });
    }
  }, [loggedInUser]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }
  console.log(sitterRequests);
  let pastRequests;
  let currentRequests;
  let nextRequest;
  if (sitterRequests) {
    const requests = sitterRequests.map((request: RequestApiData) => {
      return {
        ...request,
        start: new Date(request.start),
        end: new Date(request.end),
      };
    });
    const sortedRequests = requests.sort((a: any, b: any) => a.start - b.start);

    const formatedRequests = sortedRequests.map((request: RequestApiData) => {
      return {
        ...request,
        start: format(new Date(request.start), 'd MMMM yyyy, h'),
        end: format(new Date(request.end), 'h a'),
      };
    });

    pastRequests = formatedRequests
      .filter((request: RequestApiData) => {
        return new Date(request.start).getTime() < new Date().getTime();
      })
      .reverse();

    currentRequests = formatedRequests.filter((request: RequestApiData) => {
      return new Date().getTime() < new Date(request.start).getTime();
    });

    nextRequest = currentRequests.shift();
  }

  return (
    <PageContainer>
      <Grid sx={{ width: '87%', margin: '0 auto' }} spacing={5} container>
        <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }} className={classes.leftContainer}>
          <Box className={classes.leftWrapper}>
            <Paper className={classes.cardWrapper}>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Your Next booking:
                </Typography>
                {nextRequest && <RequestInfo data={nextRequest} large={true} handleStatus={handleStatus} />}
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
                  {currentRequests &&
                    currentRequests.map((request: RequestApiData) => (
                      <RequestInfo key={request._id} data={request} handleStatus={handleStatus} />
                    ))}
                </Box>

                <Box className={classes.bookingContent}>
                  <Typography className={classes.title} variant="caption" gutterBottom>
                    Past bookings:
                  </Typography>
                </Box>
                <Box className={classes.requests}>
                  {pastRequests &&
                    pastRequests.map((request: RequestApiData) => (
                      <RequestInfo key={request._id} data={request} handleStatus={handleStatus} />
                    ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }} className={classes.rightContainer}>
          <Box className={classes.rightWrapper}>
            <Paper className={classes.cardWrapper}>
              <Box className={classes.calendarContainer}>
                <MyCalendar nextRequest={nextRequest} />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
