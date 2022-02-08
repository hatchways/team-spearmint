import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Box, Grid, Typography, Avatar, CircularProgress } from '@mui/material';
import useStyles from './useStyles';
import CardWrapper from '../../components/CardWrapper/CardWrapper';
import getSitterRequests from '../../helpers/APICalls/sitterRequests';
import changeStatus from '../../helpers/APICalls/changeStatus';
import { useAuth } from '../../context/useAuthContext';
import MyCalendar from '../../components/MyCalendar/MyCalendar';
import { format } from 'date-fns';
import RequestInfo from './RequestInfo/RequestInfo';
import { RequestApiData } from '../../interface/RequestApiData';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { sitterRequests } = useAuth();
  const { updateSitterRequestsContext } = useAuth();

  const handleStatus = (
    accepted: boolean,
    declined: boolean,
    requestId: string,
    sitterId: string,
    avatar?: string | undefined,
  ): void => {
    changeStatus(accepted, declined, requestId, sitterId, avatar).then((res) => {
      const index = sitterRequests.findIndex((request: RequestApiData) => {
        return request._id === requestId;
      });
      if (index !== -1) {
        const newSitterRequests = [...sitterRequests];
        newSitterRequests[index] = res;
        console.log(res);
        updateSitterRequestsContext(newSitterRequests);
      }
    });
  };

  useEffect(() => {
    if (loggedInUser) {
      getSitterRequests(loggedInUser.id).then((res) => updateSitterRequestsContext(res));
    }
  }, [loggedInUser]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

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
      <Grid sx={{ width: '87%', margin: '0 auto' }} spacing={2} container>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} className={classes.leftContainer}>
          <Box className={classes.leftWrapper}>
            <CardWrapper>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Your Next booking:
                </Typography>
                {nextRequest && (
                  <RequestInfo
                    key={nextRequest._id}
                    requestId={nextRequest._id}
                    sitterId={nextRequest.sitterId}
                    date={`${nextRequest.start}-${nextRequest.end}`}
                    start={nextRequest.start}
                    avatar={nextRequest.ownerPhoto}
                    name={nextRequest.ownerName}
                    status={
                      nextRequest.accepted === false
                        ? nextRequest.declined === false
                          ? 'pending'
                          : 'declined'
                        : 'accepted'
                    }
                    accepted={nextRequest.accepted}
                    declined={nextRequest.declined}
                    size="large"
                    handleStatus={handleStatus}
                  />
                )}
              </Box>
            </CardWrapper>
            <CardWrapper>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Current bookings:
                </Typography>
              </Box>
              <Box className={classes.scrollArea}>
                <Box className={classes.requests}>
                  {currentRequests &&
                    currentRequests.map((request: any) => (
                      <RequestInfo
                        key={request._id}
                        requestId={request._id}
                        sitterId={request.sitterId}
                        date={`${request.start}-${request.end}`}
                        start={request.start}
                        avatar={request.ownerPhoto}
                        name={request.ownerName}
                        status={
                          request.accepted === false
                            ? request.declined === false
                              ? 'pending'
                              : 'declined'
                            : 'accepted'
                        }
                        accepted={request.accepted}
                        declined={request.declined}
                        handleStatus={handleStatus}
                      />
                    ))}
                </Box>

                <Box className={classes.bookingContent}>
                  <Typography className={classes.title} variant="caption" gutterBottom>
                    Past bookings:
                  </Typography>
                </Box>
                <Box className={classes.requests}>
                  {pastRequests &&
                    pastRequests.map((request: any) => (
                      <RequestInfo
                        key={request._id}
                        requestId={request._id}
                        sitterId={request.sitterId}
                        date={`${request.start}-${request.end}`}
                        start={request.start}
                        avatar={request.ownerPhoto}
                        name={request.ownerName}
                        status={
                          request.accepted === false
                            ? request.declined === false
                              ? 'pending'
                              : 'declined'
                            : 'accepted'
                        }
                        accepted={request.accepted}
                        declined={request.declined}
                        handleStatus={handleStatus}
                      />
                    ))}
                </Box>
              </Box>
            </CardWrapper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} className={classes.rightContainer}>
          <Box className={classes.rightWrapper}>
            <CardWrapper>
              <Box className={classes.calendarContainer}>
                <MyCalendar />
              </Box>
            </CardWrapper>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
