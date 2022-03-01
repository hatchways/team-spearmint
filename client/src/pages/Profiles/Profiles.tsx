import { Button, TextField, Typography, Box } from '@mui/material';
import useStyles from './useStyles';
import hero from '../../images/landing/hero.jpg';
import { useEffect, useState } from 'react';
import { getProfiles } from '../../helpers/APICalls/getProfiles';
import { useSnackBar } from '../../context/useSnackbarContext';
import ProfileCard from './ProfileCard/ProfileCard';
import SearchBar from './SearchBar/SearchBar';

export default function Profiles() {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const loadProfiles = async () => {
      const profiles = await getProfiles();

      if (profiles) {
        setProfiles(profiles.profiles);
      } else {
        updateSnackBarMessage('No profiles found! Please enter a new location/dates!');
      }
    };

    loadProfiles().catch((error) => updateSnackBarMessage(error));
  }, [updateSnackBarMessage]);

  const [currentIndicesTopRow, setCurrentIndicesTopRow] = useState(3);
  const [currentIndicesBottomRow, setCurrentIndicesBottomRow] = useState(6);

  const showMoreProfiles = () => {
    if (currentIndicesTopRow + 3 > profiles.length - 1) {
      setCurrentIndicesTopRow(3);
      setCurrentIndicesBottomRow(6);
    } else {
      setCurrentIndicesTopRow(currentIndicesTopRow + 6);
      setCurrentIndicesBottomRow(currentIndicesBottomRow + 6);
    }
  };
  console.log(profiles);
  return (
    <>
      <Box className={classes.flexContainer}>
        <SearchBar />
        <Box>
          <Box className={classes.innerFlexRowContainer}>
            {profiles.slice(currentIndicesTopRow - 3, currentIndicesTopRow).map((profile) => {
              return <ProfileCard key={profile._id} profile={profile}></ProfileCard>;
            })}
          </Box>
          <Box className={classes.innerFlexRowContainer}>
            {profiles.slice(currentIndicesBottomRow - 3, currentIndicesBottomRow).map((profile) => {
              return <ProfileCard key={profile._id} profile={profile}></ProfileCard>;
            })}
          </Box>
        </Box>

        <Button
          onClick={() => showMoreProfiles()}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
        >
          Show More
        </Button>
      </Box>
    </>
  );
}
