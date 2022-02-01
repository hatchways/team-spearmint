import useStyles from './useStyles';
import hero from '../../../images/landing/hero.jpg';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';

interface Props {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: any;
}

export default function ProfilePhoto({ header, currentUser, currentProfile }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.flexContainer}>
        <SettingHeader header={header} />

        <img className={classes.profilePhoto} src={currentProfile?.photo ? currentProfile.photo : hero}></img>
        <Typography variant="h6" className={classes.picText}>
          Be sure to use a photo that clearly shows your face
        </Typography>
        <Box textAlign="center" marginTop={5}>
          <Button type="submit" size="large" variant="contained" className={classes.submit}>
            Upload a file from your device
          </Button>
        </Box>
        <Typography variant="subtitle1" className={classes.deleteText}>
          Delete Photo
        </Typography>
      </Box>
    </>
  );
}
