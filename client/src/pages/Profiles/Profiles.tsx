import { Button, TextField, Typography, Box } from '@mui/material';
import useStyles from './useStyles';
import hero from '../../images/landing/hero.jpg';
import { useEffect, useState } from 'react';
import { getProfiles } from '../../helpers/APICalls/getProfiles';
import { useSnackBar } from '../../context/useSnackbarContext';
import ProfileCard from './ProfileCard/ProfileCard';
import SearchBar from './SearchBar/SearchBar';
import { Profile } from '../../interface/Profile';
import { useSitterSearch } from '../../context/useSitterSearchContext';

export default function Profiles() {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { location, start, end } = useSitterSearch();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchLocation, setSearchLocation] = useState<string>();
  const [searchDate, setSearchDate] = useState<string>();

  useEffect(() => {
    const loadProfiles = async () => {
      const profiles = await getProfiles(location!, start!.toString());

      if (profiles) {
        setProfiles(profiles.profiles);
      } else {
        updateSnackBarMessage('No profiles found! Please enter a new location/dates!');
      }
    };
    if (!searchLocation && !searchDate && location && start) {
      loadProfiles().catch((error) => updateSnackBarMessage(error));
    }
  }, [updateSnackBarMessage, searchLocation, searchDate, location, start]);

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

  const handleSearchClick = async () => {
    const profiles = await getProfiles(searchLocation, searchDate);
    console.log(profiles);
    setProfiles(profiles.profiles);
  };

  return (
    <>
      <Box className={classes.flexContainer}>
        <SearchBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          handleSearchClick={handleSearchClick}
        ></SearchBar>
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
