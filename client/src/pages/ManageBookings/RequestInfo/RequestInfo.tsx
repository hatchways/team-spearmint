import { useState } from 'react';
import clsx from 'clsx';
import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import useStyles from './useStyles';
import SettingsIcon from '@mui/icons-material/Settings';
import MyModal from './MyModal';

const RequestInfo: React.FC<{
  requestId: string;
  sitterId: string;
  date: string;
  start: Date;
  avatar?: string | undefined;
  name: string;
  status: string;
  accepted: boolean;
  declined: boolean;
  size?: string;
  handleStatus: (
    accepted: boolean,
    declined: boolean,
    requestId: string,
    sitterId: string,
    avatar?: string | undefined,
  ) => void;
}> = ({ requestId, sitterId, date, start, avatar, name, status, size, accepted, declined, handleStatus }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    if (new Date(start) > new Date()) {
      setOpen(true);
    }
  };
  const handleClose = (): void => setOpen(false);

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
        <Button onClick={handleOpen} className={classes.statusButton}>
          <Typography variant="caption" className={classes.status}>
            {status}
          </Typography>
        </Button>
        <Box className={clsx(classes.settingsIcon, size === 'large' && classes.settingsIconLarge)}>
          <SettingsIcon color="disabled" fontSize="small" />
        </Box>
        <MyModal
          requestId={requestId}
          sitterId={sitterId}
          date={date}
          avatar={avatar}
          name={name}
          status={status}
          accepted={accepted}
          declined={declined}
          handleStatus={handleStatus}
          open={open}
          handleClose={handleClose}
        />
      </Grid>
    </Box>
  );
};

export default RequestInfo;
