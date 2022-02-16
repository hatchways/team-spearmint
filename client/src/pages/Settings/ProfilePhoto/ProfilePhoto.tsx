import useStyles from './useStyles';
import hero from '../../../images/landing/hero.jpg';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import uploadPhoto from '../../../helpers/APICalls/uploadPhoto';
import deletePhoto from '../../../helpers/APICalls/deletePhoto';
import { useSnackBar } from '../../../context/useSnackbarContext';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: Profile;
}

export default function ProfilePhoto({ header, currentUser, currentProfile }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  const classes = useStyles();
  const [profilePhoto, setProfilePhoto] = useState<File | null>();

  const uploadPhotoInput = useRef<HTMLInputElement>(null);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files?.[0]);
  };

  const handleDelete = async () => {
    if (currentProfile) {
      const splitUrl = currentProfile.photo.split('/');
      const key = profilePhoto ? profilePhoto.name : splitUrl[splitUrl.length - 1];
      const deleted = await deletePhoto(key, currentProfile._id);

      if (deleted) {
        setProfilePhoto(null);
        updateSnackBarMessage('Photo successfully deleted');
      } else {
        updateSnackBarMessage('Error, please try again!');
      }
    }
  };

  useEffect(() => {
    if (profilePhoto && currentUser) {
      const imageFormObject = new FormData();
      imageFormObject.append('image', profilePhoto || '');
      const upload = async () => {
        const uploaded = await uploadPhoto(imageFormObject, currentUser);

        if (uploaded) {
          updateSnackBarMessage('Photo successfully uploaded');
        } else {
          updateSnackBarMessage('Error, please try again!');
        }
      };

      upload();
    }
  }, [profilePhoto, currentUser, updateSnackBarMessage]);

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        <SettingHeader header={header} />
        <img
          alt={'Profile Photo'}
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
            size="large"
            variant="contained"
            className={classes.submit}
          >
            Upload a file from your device
          </Button>
        </Box>
        <Button variant="text" onClick={() => handleDelete()} className={classes.deleteText}>
          Delete Photo <DeleteIcon></DeleteIcon>
        </Button>
      </Box>
    </>
  );
}
