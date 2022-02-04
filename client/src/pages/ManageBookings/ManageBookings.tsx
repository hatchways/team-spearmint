import { useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import clsx from 'clsx';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import useStyles from './useStyles';
import CardWrapper from '../../components/CardWrapper/CardWrapper';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import dogPicture from '../../images/landing/hero.jpg';

const RequestInfo: React.FC<{
  date?: string | Date;
  avatar?: any;
  name?: string;
  status?: string;
  size?: any;
}> = ({ date, avatar, name, status, size }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.requestInfo, size === 'large' && classes.requestInfoLarge)}>
      <Grid xs={9} item>
        <Typography variant={size === 'large' ? 'h6' : 'body1'} gutterBottom>
          {date}
        </Typography>
        <Box className={classes.nameAvatar}>
          <Avatar
            alt="Profile Image"
            src={avatar}
            sx={size === 'large' ? { width: 50, height: 50 } : { width: 40, height: 40 }}
          />
          <Typography variant={size === 'large' ? 'h6' : 'body1'}>{name}</Typography>
        </Box>
      </Grid>
      <Grid xs={3} item className={classes.statusAndIcon}>
        <Typography variant="caption" className={classes.status}>
          {size === 'large' ? '' : status}
        </Typography>
        <NavLink to="" className={clsx(classes.settingsIcon, size === 'large' && classes.settingsIconLarge)}>
          <SettingsIcon color="disabled" fontSize="small" />
        </NavLink>
      </Grid>
    </Box>
  );
};

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();

  return (
    <PageContainer>
      <Grid sx={{ width: '87%', margin: '0 auto' }} container>
        <Grid xs={12} md={6} className={classes.leftContainer}>
          <Box className={classes.leftWrapper}>
            <CardWrapper>
              <Box className={classes.bookingContent}>
                <Typography className={classes.title} variant="caption" gutterBottom>
                  Your Next booking:
                </Typography>
                <RequestInfo
                  key="123"
                  date="5 April 2020, 10-12 AM"
                  avatar={dogPicture}
                  name="Norma Byers"
                  status="ddd"
                  size="large"
                />
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
                  <RequestInfo
                    key="123"
                    date="5 April 2020, 10-12 AM"
                    avatar={dogPicture}
                    name="Norma Byers"
                    status="Accepted"
                  />
                  <RequestInfo
                    key="123"
                    date="5 April 2020, 10-12 AM"
                    avatar={dogPicture}
                    name="Norma Byers"
                    status="Accepted"
                  />
                </Box>

                <Box className={classes.bookingContent}>
                  <Typography className={classes.title} variant="caption" gutterBottom>
                    Past bookings:
                  </Typography>
                </Box>
                <Box className={classes.requests}>
                  <RequestInfo
                    key="123"
                    date="5 April 2020, 10-12 AM"
                    avatar={dogPicture}
                    name="Norma Byers"
                    status="Accepted"
                  />
                  <RequestInfo
                    key="123"
                    date="5 April 2020, 10-12 AM"
                    avatar={dogPicture}
                    name="Norma Byers"
                    status="Accepted"
                  />
                  <RequestInfo
                    key="123"
                    date="5 April 2020, 10-12 AM"
                    avatar={dogPicture}
                    name="Norma Byers"
                    status="Accepted"
                  />
                </Box>
              </Box>
            </CardWrapper>
          </Box>
        </Grid>
        <Grid xs={12} md={6} className={classes.rightContainer}>
          <Box className={classes.rightWrapper}>
            <CardWrapper>CALENDAR</CardWrapper>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
