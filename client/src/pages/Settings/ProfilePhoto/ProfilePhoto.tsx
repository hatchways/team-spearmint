import useStyles from './useStyles';
import hero from '../../../images/landing/hero.jpg';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { ChangeEvent, useState, useRef } from 'react';
import uploadPhoto from '../../../helpers/APICalls/uploadPhoto';
interface Props {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: any;
}

export default function ProfilePhoto({ header, currentUser, currentProfile }: Props): JSX.Element {
  const classes = useStyles();
  const [profilePhoto, setProfilePhoto] = useState<File>();
  const uploadPhotoInput = useRef<HTMLInputElement>(null);
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // return setProfilePhoto(e.target.files?.[0]);
    const imageFormObject = new FormData();
    // imageFormObject.append('imageName', 'profile-image' + Date.now());
    imageFormObject.append('image', e.target.files?.[0] || '');
    uploadPhoto(imageFormObject, currentUser);
  };

  return (
    <>
      <Box className={classes.flexContainer}>
        <SettingHeader header={header} />

        <img className={classes.profilePhoto} src={currentProfile?.photo ? currentProfile.photo : hero}></img>
        <Typography variant="h6" className={classes.picText}>
          Be sure to use a photo that clearly shows your face
        </Typography>
        <Box textAlign="center" marginTop={5}>
          <form>
            <input
              ref={uploadPhotoInput}
              className={classes.uploadInput}
              type="file"
              onChange={(e) => handleUpload(e)}
            />
          </form>
          <Button
            onClick={() => {
              uploadPhotoInput.current?.click();
            }}
            type="submit"
            size="large"
            variant="contained"
            className={classes.submit}
          >
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
