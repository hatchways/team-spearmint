import clsx from 'clsx';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import useStyles from './useStyles';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const RequestInfo: React.FC<{
  dummyData: any;
  size?: string;
}> = ({ dummyData, size }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.requestInfo, size === 'large' && classes.requestInfoLarge)}>
      <Grid xs={9} item>
        <Typography variant={size === 'large' ? 'h6' : 'body1'} gutterBottom>
          {dummyData.date}
        </Typography>
        <Box className={classes.nameAvatar}>
          <Avatar
            alt="Profile Image"
            src={dummyData.avatar}
            sx={size === 'large' ? { width: 50, height: 50 } : { width: 40, height: 40 }}
          />
          <Typography variant={size === 'large' ? 'h6' : 'body1'}>{dummyData.name}</Typography>
        </Box>
      </Grid>
      <Grid xs={3} item className={classes.statusAndIcon}>
        <Typography variant="caption" className={classes.status}>
          {size === 'large' ? '' : dummyData.status}
        </Typography>
        <NavLink to="" className={clsx(classes.settingsIcon, size === 'large' && classes.settingsIconLarge)}>
          <SettingsIcon color="disabled" fontSize="small" />
        </NavLink>
      </Grid>
    </Box>
  );
};

export default RequestInfo;
