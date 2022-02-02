import useStyles from './useStyles';
import hero from '../../../images/landing/hero.jpg';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import uploadPhoto from '../../../helpers/APICalls/uploadPhoto';
import deletePhoto from '../../../helpers/APICalls/deletePhoto';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: any;
}

export default function ProfilePhoto({ header, currentUser, currentProfile }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  const classes = useStyles();
  const [profilePhoto, setProfilePhoto] = useState<File | null>();
  const [profilePhotoKey, setProfilePhotoKey] = useState<string | undefined | null>();
  const uploadPhotoInput = useRef<HTMLInputElement>(null);
  //when profile photo page loads, set the profilePhotoKey. Take the currentProfile photo url and extract the name/key.
  useEffect(() => {
    if (currentProfile && currentProfile.photo) {
      const splitUrl = currentProfile.photo.split('/');
      setProfilePhoto(currentProfile.photo);
      setProfilePhotoKey(splitUrl[splitUrl.length - 1]);
    }
  }, [currentProfile]);

  //on upload set the profile photo so that the image will update instantly and set the profilePhotoKey so that there is the reference to delete it
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files?.[0]);
    setProfilePhotoKey(e.target.files?.[0].name);
  };

  const handleDelete = () => {
    deletePhoto(profilePhotoKey, currentProfile._id);
    setProfilePhoto(null);
    setProfilePhotoKey(null);
    updateSnackBarMessage('Photo successfully deleted');
  };

  //if there is a profilePhoto (as in someone uploaded a photo), then upload this to the backend to the s3 bucket and to the associated profile.
  useEffect(() => {
    if (profilePhoto && currentUser) {
      const imageFormObject = new FormData();
      imageFormObject.append('image', profilePhoto || '');
      uploadPhoto(imageFormObject, currentUser);
      updateSnackBarMessage('Photo successfully uploaded');
    }
  }, [profilePhoto, currentUser, updateSnackBarMessage]);

  return (
    <>
      <Box className={classes.flexContainer}>
        <SettingHeader header={header} />
        <img
          className={classes.profilePhoto}
          src={!profilePhoto ? currentProfile?.photo : URL.createObjectURL(profilePhoto)}
        ></img>
        <Typography variant="h6" className={classes.picText}>
          Be sure to use a photo that clearly shows your face
        </Typography>
        <Box textAlign="center" marginTop={5}>
          <form>
            <input ref={uploadPhotoInput} className={classes.upload} type="file" onChange={(e) => handleUpload(e)} />
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
        <Typography onClick={() => handleDelete()} variant="subtitle1" className={classes.deleteText}>
          Delete Photo
        </Typography>
      </Box>
    </>
  );
}
